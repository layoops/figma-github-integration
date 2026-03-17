import type { RefObject } from 'react';

import { useHotkey } from '@tanstack/react-hotkeys';
import { useCanGoBack, useRouter } from '@tanstack/react-router';

export function useKeyboardShortcuts(
  searchInputRef: RefObject<HTMLDivElement | null>,
  prevFocusedElementRef: RefObject<HTMLElement | null>
) {
  const router = useRouter();
  const canGoBack = useCanGoBack();

  const canGoForward = router.history.location.state.__TSR_index < router.history.length - 1;

  useHotkey('Mod+ArrowLeft', () => {
    if (canGoBack) {
      router.history.back();
    }
  });

  useHotkey('Mod+ArrowRight', () => {
    if (canGoForward) {
      router.history.forward();
    }
  });

  useHotkey('/', () => {
    if (document.activeElement instanceof HTMLElement) {
      prevFocusedElementRef.current = document.activeElement;
    }
    searchInputRef.current?.focus();
  });

  useHotkey('Mod+K', () => {
    if (document.activeElement instanceof HTMLElement) {
      prevFocusedElementRef.current = document.activeElement;
    }
    searchInputRef.current?.focus();
  });
}
