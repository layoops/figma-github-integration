import { createFileRoute } from '@tanstack/react-router';

import { SearchPage } from '@/pages/search-page';

export const Route = createFileRoute('/_layout/_protected/search')({
  component: SearchPage,
  validateSearch: (search) => {
    return {
      q: typeof search.q === 'string' ? search.q : undefined,
    };
  },
});
