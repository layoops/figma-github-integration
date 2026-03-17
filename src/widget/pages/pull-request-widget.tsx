import type { WidgetTheme } from '../shared/styles/themes';
import type { PullRequest } from '@octokit/graphql-schema';

import { routes } from '../../global-shared/routes-map';
import { PullRequestContent } from '../entities/pull-request';
import { openPluginUI } from '../shared/lib/helpers';
import { useNodeToggleMore } from '../shared/lib/hooks';
import { SYNC_KEYS } from '../shared/lib/sync-keys';
import { getColorStyles } from '../shared/styles';
import { EntityHeader, EntityHeaderTitle, EntityStateLabel } from '../shared/ui';
import { AutoLayout, Line, useSyncedState } from '../widget-components';
import { PullRequestContentPreview } from '../widgets/content-preview/ui';
import { Footer } from '../widgets/layout';

type PullRequestWidgetProps = {
  pullRequest?: PullRequest;
};

export const PullRequestWidget = ({ pullRequest: passedPullRequest }: PullRequestWidgetProps) => {
  const [pullRequest] = useSyncedState<PullRequest | null>(
    SYNC_KEYS.entity.pullRequest.content,
    () => passedPullRequest ?? null
  );
  const [widgetTheme] = useSyncedState<WidgetTheme>(SYNC_KEYS.widget.theme, 'light');

  const { id, title } = pullRequest;

  const linkText = `${pullRequest.repository.owner.login}/${pullRequest.repository.name}#${pullRequest.number}`;

  const [isMoreOpen, setIsMoreOpen] = useSyncedState<boolean>(
    SYNC_KEYS.entity.pullRequest.isOpenMore,
    false
  );

  const { toggleMore } = useNodeToggleMore({ setIsToggled: setIsMoreOpen });

  const colorStyles = getColorStyles(widgetTheme);

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
                  routeName: routes.pullRequest(id),
                  props: {},
                  options: { visible: true },
                });
              }}
              preLinkChildren={
                <EntityStateLabel
                  target="pullRequest"
                  iconOnly={linkText ? true : false}
                  state={pullRequest.state}
                />
              }
              text={linkText}
            />
          }
          contentPreview={
            <PullRequestContentPreview
              githubEntity={{
                entityType: 'pullRequest',
                entity: { id: id, title: title },
              }}
              openedMore={isMoreOpen}
              pullRequest={pullRequest}
            />
          }
          onOpenMoreButtonClick={toggleMore}
          openedMore={isMoreOpen}
        />
      ) : null}
      <PullRequestContent pullRequest={pullRequest} hidden={!isMoreOpen} />
      <Line hidden={!isMoreOpen} stroke={colorStyles.border} strokeWidth={1} length="fill-parent" />
      <Footer
        githubEntity={{
          entityType: 'pullRequest',
          entity: { id: id, title: title },
        }}
        hidden={!isMoreOpen}
      />
    </AutoLayout>
  );
};
