export function partiallyHideText(value: string): string {
  if (!value) {
    return '';
  }

  if (value.length <= 8) {
    return value;
  }

  const start = value.slice(0, 4);
  const end = value.slice(-4);
  const hidden = '•'.repeat(value.length - 8);

  return `${start}${hidden}${end}`;
}
