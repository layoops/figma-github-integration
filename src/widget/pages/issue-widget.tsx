import type { DraftIssue, Issue } from '@octokit/graphql-schema';

import { routes } from '../../global-shared/routes-map';
import { IssueContent } from '../entities/issue/ui';
import { openPluginUI } from '../shared/lib/helpers';
import { useNodeToggleMore } from '../shared/lib/hooks';
import { SYNC_KEYS } from '../shared/lib/sync-keys';
import { ColorStyles } from '../shared/styles';
import { EntityHeader, EntityHeaderTitle, EntityStateLabel } from '../shared/ui';
import { AutoLayout, Line, useSyncedState } from '../widget-components';
import { IssueContentPreview } from '../widgets/content-preview';
import { Footer } from '../widgets/layout';

export const IssueWidget = () => {
  const [githubIssue] = useSyncedState<Issue | DraftIssue | null>(
    SYNC_KEYS.entity.issue.content,
    null
  );

  const { __typename, id, title } = githubIssue;

  const [isMoreOpen, setIsMoreOpen] = useSyncedState<boolean>(
    SYNC_KEYS.entity.issue.isOpenMore,
    false
  );

  const { toggleMore: toggleMore } = useNodeToggleMore({ setIsToggled: setIsMoreOpen });

  const linkText =
    githubIssue.__typename === 'Issue'
      ? `${githubIssue.repository.owner.login}/${githubIssue.repository.name}#${githubIssue.number}`
      : title;

  return (
    <AutoLayout
      verticalAlignItems="center"
      horizontalAlignItems="center"
      direction="vertical"
      width="fill-parent"
    >
      {title ? (
        <EntityHeader
          title={
            <EntityHeaderTitle
              onClick={() => {
                openPluginUI({
                  routeName: routes.issue(id),
                  props: {},
                  options: { visible: true },
                });
              }}
              preLinkChildren={
                <EntityStateLabel
                  target="issue"
                  iconOnly={linkText ? true : false}
                  state={__typename === 'Issue' ? githubIssue.state : 'DRAFT'}
                />
              }
              text={linkText}
            />
          }
          contentPreview={
            <IssueContentPreview
              githubEntity={{
                entityType: 'issue',
                entity: { id: id, title: title },
              }}
              openedMore={isMoreOpen}
              issue={githubIssue}
            />
          }
          onOpenMoreButtonClick={toggleMore}
          openedMore={isMoreOpen}
        />
      ) : null}
      <IssueContent entity={githubIssue} hidden={!isMoreOpen} />
      <Line hidden={!isMoreOpen} stroke={ColorStyles.border} strokeWidth={1} length="fill-parent" />
      <Footer
        githubEntity={{
          entityType: 'issue',
          entity: { id: id, title: title },
        }}
        hidden={!isMoreOpen}
      />
    </AutoLayout>
  );
};
