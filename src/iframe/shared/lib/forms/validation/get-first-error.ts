export function getFirstError(errors: readonly unknown[]): string | undefined {
  if (errors.length === 0) {
    return;
  }
  const first = errors.at(0);
  if (typeof first === 'string') {
    return first;
  }
  if (first && typeof first === 'object' && 'message' in first) {
    return String((first as { message: unknown }).message);
  }
  return;
}
