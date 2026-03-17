export type SuggestionConfig<K extends string = string> = {
  keys: readonly K[];
  values: Partial<Record<K, readonly string[]>>;
};
