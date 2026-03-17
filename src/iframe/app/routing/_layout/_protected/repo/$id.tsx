import { createFileRoute } from '@tanstack/react-router';

import { githubRepositoryQueryOptions } from '@/entities/repository/api/repo-query';
import { Loader } from '@/shared/ui';
import { RepoLayout } from '@/widgets/repo-layout';

export const Route = createFileRoute('/_layout/_protected/repo/$id')({
  component: RepoLayout,
  loader: async ({ context, params }) => {
    const { queryClient, auth } = context;

    return queryClient.ensureQueryData(
      githubRepositoryQueryOptions({ repoId: params.id, token: auth.token })
    );
  },
  pendingComponent: () => <Loader />,
  errorComponent: ({ error }) => (
    <div>Произошла ошибка при загрузке репозитория: {error.message}</div>
  ),
});
