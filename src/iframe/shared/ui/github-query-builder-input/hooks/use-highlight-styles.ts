import { useEffect, useRef } from 'react';

import { HIGHLIGHT_CSS_RULES } from '../lib/constants';
import { supportsConstructableStylesheets } from '../lib/helpers';

export const useHighlightStyles = (highlightName: string) => {
  const styleRef = useRef<CSSStyleSheet | HTMLStyleElement | null>(null);

  useEffect(() => {
    const ruleText = `::highlight(${highlightName}) { ${HIGHLIGHT_CSS_RULES} }`;

    if (supportsConstructableStylesheets) {
      if (!styleRef.current || !(styleRef.current instanceof CSSStyleSheet)) {
        styleRef.current = new CSSStyleSheet();
      }

      const sheet = styleRef.current as CSSStyleSheet;

      sheet.replaceSync(ruleText);

      if (!document.adoptedStyleSheets.includes(sheet)) {
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
      }

      return () => {
        document.adoptedStyleSheets = document.adoptedStyleSheets.filter((s) => s !== sheet);
      };
    }
    if (!styleRef.current || !(styleRef.current instanceof HTMLStyleElement)) {
      const styleElement = document.createElement('style');
      styleElement.dataset.highlightName = highlightName;
      document.head.appendChild(styleElement);
      styleRef.current = styleElement;
    }

    const styleElement = styleRef.current as HTMLStyleElement;
    styleElement.textContent = ruleText;

    return () => {
      if (styleElement && document.head.contains(styleElement)) {
        styleElement.remove();
      }
      styleRef.current = null;
    };
  }, [highlightName]);
};
