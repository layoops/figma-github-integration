import type { RefObject } from 'react';

import { useEffect, useState } from 'react';

export function useInView<T extends Element | null>(
  ref: RefObject<T>,
  options?: IntersectionObserverInit
) {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref?.current;
    if (!el) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0,
        ...options,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [ref, options]);

  return inView;
}
