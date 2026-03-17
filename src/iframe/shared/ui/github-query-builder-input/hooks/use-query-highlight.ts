import type { SuggestionConfig } from '../lib/types';
import type { RefObject } from 'react';

import { useCallback, useEffect, useMemo } from 'react';

export const useQueryHighlight = <K extends string = string>({
  editorRef,
  highlightName,
  suggestionsConfig,
}: {
  editorRef: RefObject<HTMLDivElement | null>;
  highlightName: string;
  suggestionsConfig?: SuggestionConfig<K>;
}) => {
  const keysRegexPart = useMemo(() => {
    if (!suggestionsConfig || suggestionsConfig.keys.length === 0) {
      return null;
    }
    return suggestionsConfig.keys.join('|');
  }, [suggestionsConfig]);

  const updateHighlights = useCallback(() => {
    if (
      typeof CSS === 'undefined' ||
      !('highlights' in CSS) ||
      !editorRef.current ||
      !keysRegexPart
    ) {
      return;
    }

    const textNode = editorRef.current.firstChild;

    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) {
      CSS.highlights.delete(highlightName);
      return;
    }

    const text = textNode.textContent || '';
    const ranges: Range[] = [];
    const regex = new RegExp(`\\b(${keysRegexPart}):([^\\s]*)`, 'gi');

    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      const keyStr = match[1];
      const valueStr = match[2];

      if (!valueStr) continue;

      const start = match.index + keyStr.length + 1;
      const end = start + valueStr.length;

      try {
        const range = new Range();
        range.setStart(textNode, start);
        range.setEnd(textNode, end);
        ranges.push(range);
      } catch (e) {
        console.warn('Failed to create Range for highlighting:', e);
      }
    }

    CSS.highlights.set(highlightName, new Highlight(...ranges));
  }, [editorRef, highlightName, keysRegexPart]);

  useEffect(() => {
    return () => {
      if (typeof CSS !== 'undefined' && 'highlights' in CSS) {
        CSS.highlights.delete(highlightName);
      }
    };
  }, [highlightName]);

  return { updateHighlights };
};
