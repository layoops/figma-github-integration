import type { Issue } from '@octokit/graphql-schema';

import { MESSAGE_TYPES } from '@/global-shared/message-type';
import { githubRequest } from '@/shared/api/graphql/github-graphql-api';
import { GQL_ISSUE_QUERY } from '@/shared/api/graphql/queries/issue';
import { useAppContext } from '@/shared/lib/contexts';
import { useImportEntityToWidget } from '@/shared/lib/hooks/use-import-entity-to-widget';
import { sendMessageToWidget } from '@/shared/lib/utils';

type IssueQueryResponse = {
  node: Issue | null;
};

export const useImportIssueToFigma = () => {
  const { githubAccessToken, applicationSettings: settings } = useAppContext();

  const variables = {
    projectFieldValue: settings?.project.customField,
    includeMilestone: settings?.issue.includeMilestone ?? false,
    includeComments: settings?.issue.includeComments ?? false,
    includeLabels: settings?.issue.includeLabels ?? false,
    includeDevelopment: settings?.issue.includeDevelopment ?? false,
  };

  return useImportEntityToWidget<IssueQueryResponse, string>({
    mutationFn: async (id) => {
      return githubRequest<IssueQueryResponse>({
        query: GQL_ISSUE_QUERY,
        variables: { id, ...variables },
        token: githubAccessToken || '',
      });
    },
    onSuccess: (data) => {
      if (!data.node) {
        return;
      }

      sendMessageToWidget({ type: MESSAGE_TYPES.IMPORT_GITHUB_ISSUE, data: data.node });
    },
  });
};
