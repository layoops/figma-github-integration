import type { GithubEntity } from '../../../shared/lib/types/github';

import { openPluginUI } from '../../../shared/lib/helpers';

export const resyncIssue = (props: { githubEntity: GithubEntity }) => {
  props.githubEntity.entityType === 'project'
    ? openPluginUI({
        routeName: 'import',
        props: props ?? {},
        options: { visible: true },
      })
    : openPluginUI({
        routeName: 'resync',
        props: props ?? {},
        options: {
          visible: false,
        },
      });
};
