import type { SuggestionConfig } from '@/shared/ui';

const suggestionQueryKeys = ['repo', 'type', 'state', 'sort', 'label'] as const;
type SuggestionQueryKey = (typeof suggestionQueryKeys)[number];

export const searchEntityQuerySuggestionsConfig = {
  keys: suggestionQueryKeys,
  values: {
    type: ['issue', 'pr'],
    state: ['open', 'closed'],
    sort: ['created', 'updated'],
  },
} satisfies SuggestionConfig<SuggestionQueryKey>;
