import type { PullRequest } from '@octokit/graphql-schema';

import { MESSAGE_TYPES } from '@/global-shared/message-type';
import { githubRequest } from '@/shared/api/graphql/github-graphql-api';
import { GQL_PULL_REQUEST_QUERY } from '@/shared/api/graphql/queries/pull-request';
import { useAppContext } from '@/shared/lib/contexts';
import { useImportEntityToWidget } from '@/shared/lib/hooks/use-import-entity-to-widget';
import { sendMessageToWidget } from '@/shared/lib/utils';

type PullRequestQueryResponse = {
  node: PullRequest | null;
};

export const useImportPullRequestToFigma = () => {
  const { githubAccessToken, applicationSettings: settings } = useAppContext();

  const variables = {
    projectFieldValue: settings?.project.customField,
    includeMilestone: settings?.pullRequest.includeMilestone ?? false,
    includeComments: settings?.pullRequest.includeComments ?? false,
    includeLabels: settings?.pullRequest.includeLabels ?? false,
    includeDevelopment: settings?.pullRequest.includeDevelopment ?? false,
  };

  return useImportEntityToWidget<PullRequestQueryResponse, string>({
    mutationFn: async (id) => {
      return githubRequest<PullRequestQueryResponse>({
        query: GQL_PULL_REQUEST_QUERY,
        variables: { id, ...variables },
        token: githubAccessToken || '',
      });
    },
    onSuccess: (data) => {
      if (!data.node) {
        return;
      }

      sendMessageToWidget({ type: MESSAGE_TYPES.IMPORT_GITHUB_PULL_REQUEST, data: data.node });
    },
  });
};
