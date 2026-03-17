import type { Issue, PullRequest } from '@octokit/graphql-schema';

import { useMutation } from '@tanstack/react-query';

import { MESSAGE_TYPES } from '@/global-shared/message-type';
import { useAppContext } from '@/shared/lib/contexts';
import { sendMessageToWidget } from '@/shared/lib/utils';

import { getGithubNodesByIds } from '../../../shared/api/get-github-nodes';

type ImportType = 'ISSUES' | 'PULL_REQUESTS';

export const useImportSelectedNodesToFigma = (type: ImportType) => {
  const { githubAccessToken } = useAppContext();

  const mutation = useMutation({
    mutationFn: async (ids: string[]) => {
      return getGithubNodesByIds({ ids, token: githubAccessToken });
    },
    onSuccess: (data) => {
      if (type === 'ISSUES') {
        sendMessageToWidget({ type: MESSAGE_TYPES.IMPORT_GITHUB_ISSUES, data: data as Issue[] });
      } else if (type === 'PULL_REQUESTS') {
        (data as PullRequest[]).forEach((item) => {
          sendMessageToWidget({ type: MESSAGE_TYPES.IMPORT_GITHUB_PULL_REQUEST, data: item });
        });
      }
    },
    onError: (error) => {
      console.error('Failed to import selected items', error);
    },
  });

  return {
    importItems: mutation.mutate,
    isImporting: mutation.isPending,
  };
};
