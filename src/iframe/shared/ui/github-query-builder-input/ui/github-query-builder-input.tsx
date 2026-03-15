import type { SuggestionConfig } from '../lib/types';

import {
  type FormEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
} from 'react';
import { ActionList, AnchoredOverlay } from '@primer/react';
import clsx from 'clsx';

import { useHighlightStyles, useQueryHighlight, useQuerySuggestions } from '../hooks';
import { HIGHLIGHT_BASE_NAME } from '../lib/constants';
import { cleanCssId } from '../lib/helpers';
import classes from './github-query-builder-input.module.css';

export type GithubQueryBuilderInputProps<K extends string = string> = {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  suggestionsConfig?: SuggestionConfig<K>;
};

export function GithubQueryBuilderInput<K extends string = string>({
  value = '',
  onChange,
  onBlur,
  placeholder,
  className,
  id,
  suggestionsConfig,
}: GithubQueryBuilderInputProps<K>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const overlayAnchorRef = useRef<HTMLDivElement | null>(null);

  const reactUniqueId = useId();
  const cleanId = useMemo(() => cleanCssId(reactUniqueId), [reactUniqueId]);
  const highlightName = `${HIGHLIGHT_BASE_NAME}-${cleanId}`;

  useHighlightStyles(highlightName);
  const { updateHighlights } = useQueryHighlight({ editorRef, highlightName, suggestionsConfig });
  const {
    isOpen,
    setIsOpen,
    selectedIndex,
    setSelectedIndex,
    checkContextAndPositionOverlay,
    filteredItems,
    keysRegexPart,
  } = useQuerySuggestions({ containerRef, editorRef, overlayAnchorRef, suggestionsConfig });

  const isEmpty = !value || value.length === 0;

  const applySuggestion = useCallback(
    (suggestedValue: string) => {
      if (!suggestionsConfig || !keysRegexPart || !editorRef.current) {
        return;
      }

      const selection = window.getSelection();
      if (!selection) {
        return;
      }

      editorRef.current.focus();

      const range = selection.getRangeAt(0);
      const textNode = range.startContainer;
      const textContent = textNode.textContent || '';
      const cursorIndex = range.startOffset;

      const textBeforeCursor = textContent.slice(0, cursorIndex);
      const regex = new RegExp(`(?:^|\\s)(${keysRegexPart}):([^\\s]*)$`, 'i');

      const match = regex.exec(textBeforeCursor);
      if (!match) {
        return;
      }

      const typedValue = match[2];
      const startReplace = cursorIndex - typedValue.length;

      const replacement = suggestedValue + ' ';
      const newContent =
        textContent.slice(0, startReplace) + replacement + textContent.slice(cursorIndex);

      textNode.textContent = newContent;
      onChange?.(newContent);

      try {
        const newCursorPos = startReplace + replacement.length;
        const newRange = document.createRange();
        newRange.setStart(textNode, newCursorPos);
        newRange.setEnd(textNode, newCursorPos);
        selection.removeAllRanges();
        selection.addRange(newRange);
      } catch (e) {
        console.warn('Failed to set cursor position after suggestion:', e);
      }

      updateHighlights();
      setIsOpen(false);
    },
    [suggestionsConfig, keysRegexPart, editorRef, onChange, updateHighlights, setIsOpen]
  );

  const handleInput = useCallback(
    (e: FormEvent<HTMLDivElement>) => {
      const newValue = e.currentTarget.textContent || '';
      updateHighlights();
      checkContextAndPositionOverlay();
      onChange?.(newValue);
    },
    [updateHighlights, checkContextAndPositionOverlay, onChange]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isOpen && filteredItems.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((i) => (i + 1) % filteredItems.length);
          return;
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((i) => (i - 1 + filteredItems.length) % filteredItems.length);
          return;
        }

        if (e.key === 'Enter') {
          e.preventDefault();
          applySuggestion(filteredItems[selectedIndex]);
          return;
        }

        if (e.key === 'Escape' || e.key === 'Tab') {
          setIsOpen(false);
          return;
        }
      }

      if (e.key === 'Enter' && !isOpen) {
        e.preventDefault();

        const form = editorRef.current?.closest('form');
        if (!form) {
          return;
        }

        const submitBtn =
          (form.querySelector('[type="submit"]') as HTMLButtonElement) ||
          (form.querySelector('button:not([type])') as HTMLButtonElement);

        submitBtn ? submitBtn.click() : form.requestSubmit();
      }
    },
    [isOpen, filteredItems, selectedIndex, editorRef, applySuggestion, setIsOpen, setSelectedIndex]
  );

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    const currentText = editorRef.current.textContent || '';
    if (currentText !== value) {
      if (document.activeElement !== editorRef.current || currentText === '') {
        editorRef.current.textContent = value;
        updateHighlights();
      }
    }
  }, [value, updateHighlights]);

  useEffect(() => {
    updateHighlights();
  }, [updateHighlights]);

  return (
    <div ref={containerRef} className={classes['query-builder-input-container']}>
      <div
        ref={overlayAnchorRef}
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          zIndex: -1,
          width: 1,
        }}
      />

      <div
        ref={editorRef}
        id={id}
        className={clsx(classes['query-builder-input'], isEmpty && classes['is-empty'], className)}
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onMouseUp={checkContextAndPositionOverlay}
        onBlur={onBlur}
        role="textbox"
        aria-multiline="false"
        data-placeholder={placeholder}
      />

      {isOpen && filteredItems.length > 0 && (
        <AnchoredOverlay
          open
          anchorRef={overlayAnchorRef}
          renderAnchor={null}
          align="start"
          side="outside-bottom"
          focusTrapSettings={{ disabled: true }}
          focusZoneSettings={{ disabled: true }}
          overlayProps={{
            preventFocusOnOpen: true,
            onClickOutside: () => setIsOpen(false),
          }}
        >
          <ActionList selectionVariant="single">
            {filteredItems.map((item, index) => (
              <ActionList.Item
                key={item}
                active={index === selectedIndex}
                onSelect={() => applySuggestion(item)}
                onMouseDown={(e) => e.preventDefault()}
              >
                {item}
              </ActionList.Item>
            ))}
          </ActionList>
        </AnchoredOverlay>
      )}
    </div>
  );
}
