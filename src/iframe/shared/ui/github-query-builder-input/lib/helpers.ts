export const cleanCssId = (reactId: string): string => {
  return reactId.replace(/^:|:$/g, '').replace(/:/g, '-');
};

export const supportsConstructableStylesheets =
  typeof CSSStyleSheet !== 'undefined' && 'replaceSync' in CSSStyleSheet.prototype;

export const normalizeEditorContent = (el: HTMLElement): void => {
  const childNodes = Array.from(el.childNodes);
  for (const child of childNodes) {
    if (child.nodeType !== Node.TEXT_NODE) {
      const text = child.textContent || '';
      if (text) {
        const textNode = document.createTextNode(text);
        el.insertBefore(textNode, child);
      }
      el.removeChild(child);
    }
  }

  el.normalize();
};
