import type { SuggestionConfig } from '../lib/types';
import type { RefObject } from 'react';

import { useCallback, useMemo, useState } from 'react';

type UseQuerySuggestionsProps<K extends string = string> = {
  containerRef: RefObject<HTMLDivElement | null>;
  editorRef: RefObject<HTMLDivElement | null>;
  overlayAnchorRef: RefObject<HTMLDivElement | null>;
  suggestionsConfig?: SuggestionConfig<K>;
};

export const useQuerySuggestions = <K extends string = string>({
  containerRef,
  editorRef,
  overlayAnchorRef,
  suggestionsConfig,
}: UseQuerySuggestionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<K | null>(null);
  const [filterText, setFilterText] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const keysRegexPart = useMemo(() => {
    if (!suggestionsConfig || suggestionsConfig.keys.length === 0) {
      return null;
    }
    return suggestionsConfig.keys.join('|');
  }, [suggestionsConfig]);

  const checkContextAndPositionOverlay = useCallback(() => {
    if (!suggestionsConfig || !keysRegexPart || !containerRef.current || !editorRef.current) {
      setIsOpen(false);
      return;
    }

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      setIsOpen(false);
      return;
    }

    const range = selection.getRangeAt(0);

    if (!editorRef.current.contains(range.startContainer)) {
      setIsOpen(false);
      return;
    }

    const textNode = range.startContainer;
    const textContent = textNode.textContent || '';
    const cursorIndex = range.startOffset;

    const textBeforeCursor = textContent.slice(0, cursorIndex);
    const regex = new RegExp(`(?:^|\\s)(${keysRegexPart}):([^\\s]*)$`, 'i');

    const match = regex.exec(textBeforeCursor);
    if (!match) {
      setIsOpen(false);
      return;
    }

    const detectedKey = match[1] as K;
    const detectedValuePart = match[2];
    const suggestions = suggestionsConfig.values[detectedKey];

    if (!suggestions?.length) {
      setIsOpen(false);
      return;
    }

    setActiveKey(detectedKey);
    setFilterText(detectedValuePart);
    setSelectedIndex(0);

    try {
      const colonIndex = cursorIndex - detectedValuePart.length - 1;

      if (colonIndex >= 0 && overlayAnchorRef.current && containerRef.current) {
        const anchorRange = document.createRange();
        anchorRange.setStart(textNode, colonIndex);
        anchorRange.setEnd(textNode, colonIndex + 1);

        const charRect = anchorRange.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        overlayAnchorRef.current.style.top = `${charRect.bottom - containerRect.top}px`;
        overlayAnchorRef.current.style.left = `${charRect.left - containerRect.left}px`;
        overlayAnchorRef.current.style.height = `${charRect.height}px`;
        overlayAnchorRef.current.style.width = `1px`;

        setIsOpen(true);
      }
    } catch (e) {
      console.warn('Failed to position overlay:', e);
      setIsOpen(false);
    }
  }, [suggestionsConfig, keysRegexPart, containerRef, editorRef, overlayAnchorRef]);

  const filteredItems = useMemo(() => {
    if (!suggestionsConfig || !activeKey) {
      return [];
    }
    const items = suggestionsConfig.values[activeKey];
    if (!items) {
      return [];
    }
    return items.filter((v) => v.toLowerCase().startsWith(filterText.toLowerCase()));
  }, [activeKey, filterText, suggestionsConfig]);

  return {
    isOpen,
    setIsOpen,
    activeKey,
    filterText,
    selectedIndex,
    setSelectedIndex,
    checkContextAndPositionOverlay,
    filteredItems,
    keysRegexPart,
  };
};
