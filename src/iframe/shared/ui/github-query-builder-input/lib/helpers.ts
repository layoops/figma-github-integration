export const cleanCssId = (reactId: string): string => {
  return reactId.replace(/^:|:$/g, '').replace(/:/g, '-');
};

export const supportsConstructableStylesheets =
  typeof CSSStyleSheet !== 'undefined' && 'replaceSync' in CSSStyleSheet.prototype;
