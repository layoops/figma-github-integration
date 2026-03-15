import type { DraftIssue, Issue, ProjectV2, PullRequest } from '@octokit/graphql-schema';

import { routes } from '../../../../global-shared/routes-map';
import { openPluginUI } from '../helpers';
import { useCheckImportedEntity } from './use-check-imported-entity';

export const useOpenEntityPluginUI = () => {
  const checkIfExistEntityWidget = useCheckImportedEntity();

  const openEntityPluginUI = async (
    entity: Pick<Issue | DraftIssue | PullRequest | ProjectV2, 'id' | '__typename'>
  ) => {
    const { id: entityId, __typename } = entity;

    const existingGithubEntityWidget = checkIfExistEntityWidget({ id: entityId, __typename });

    let routeName = routes.issue(entityId);

    switch (__typename) {
      case 'Issue':
      case 'DraftIssue':
        routeName = routes.issue(entityId);
        break;
      case 'PullRequest':
        routeName = routes.pullRequest(entityId);
        break;
      case 'ProjectV2':
        routeName = routes.project(entityId);
        break;

      default:
        break;
    }

    !existingGithubEntityWidget &&
      openPluginUI({
        routeName: routeName,
        props: {},
        options: {
          visible: true,
        },
      });
  };

  return openEntityPluginUI;
};
