export function partiallyHideText(password: string): string {
  if (!password) return '';

  const visibleChars = password.slice(0, 4);
  const hiddenChars = '*'.repeat(password.length - 4);
  return visibleChars + hiddenChars;
}
