import type { ProjectWidgetData } from '../../global-shared/plugin-messages';
import type { WidgetTheme } from '../shared/styles/themes';

import { routes } from '../../global-shared/routes-map';
import { ProjectContent, type ProjectContentCounts } from '../entities/project';
import { formatDate, openPluginUI } from '../shared/lib/helpers';
import { useNodeToggleMore, useWidgetTranslation } from '../shared/lib/hooks';
import { SYNC_KEYS } from '../shared/lib/sync-keys';
import { getColorStyles, iconStyles } from '../shared/styles';
import { EntityHeader, EntityHeaderTitle } from '../shared/ui';
import { IconProjects } from '../shared/ui/icons';
import { AutoLayout, SVG, useSyncedState } from '../widget-components';
import { ProjectContentPreview } from '../widgets/content-preview';
import { Footer } from '../widgets/layout';

export type ProjectWidgetUIState = {
  more?: boolean;
};

export type GithubProject = {
  project: ProjectWidgetData | null;
  contentCount?: ProjectContentCounts;
};

export const ProjectWidget = () => {
  const { locale } = useWidgetTranslation();
  const [widgetTheme] = useSyncedState<WidgetTheme>(SYNC_KEYS.widget.theme, 'light');

  const [githubProject] = useSyncedState<GithubProject>(SYNC_KEYS.entity.project.content, {
    project: null,
    contentCount: undefined,
  });

  const { title, id, shortDescription } = githubProject.project;

  const [lastSyncDate] = useSyncedState<string | undefined>(
    SYNC_KEYS.widget.lastSyncDate,
    undefined
  );

  const [isMoreOpen, setIsMoreOpen] = useSyncedState<boolean>(
    SYNC_KEYS.entity.project.isOpenMore,
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
      <EntityHeader
        title={
          <EntityHeaderTitle
            onClick={() => {
              openPluginUI({
                routeName: routes.project(id),
                props: {},
                options: { visible: true },
              });
            }}
            preLinkChildren={
              <SVG
                src={IconProjects(colorStyles.fg.muted)}
                width={iconStyles.sizing.small}
                height={iconStyles.sizing.small}
              />
            }
            text={title}
          />
        }
        contentPreview={
          <ProjectContentPreview hidden={!shortDescription} shortDescription={shortDescription} />
        }
        openedMore={isMoreOpen}
        onOpenMoreButtonClick={toggleMore}
      />
      <ProjectContent project={githubProject.project} hidden={!isMoreOpen} />

      <Footer
        githubEntity={{
          entityType: 'project',
          entity: { id: id, title: title },
        }}
        hidden={!isMoreOpen}
        text={formatDate({
          value: lastSyncDate,
          type: 'full',
          locale,
        })}
      />
    </AutoLayout>
  );
};
