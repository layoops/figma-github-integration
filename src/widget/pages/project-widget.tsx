import type { ProjectV2 } from '@octokit/graphql-schema';

import { type CountContentTypesResult, ProjectContent } from '../entities/project';
import { formatDate } from '../shared/lib/helpers';
import { useAppendChild } from '../shared/lib/hooks/use-append-child';
import { iconStyles } from '../shared/styles';
import { IssueHeader } from '../shared/ui/components';
import { IssueHeaderTitle } from '../shared/ui/components/issue-header-title/issue-header-title';
import { IconProjects } from '../shared/ui/icons';
import { AutoLayout, SVG, useSyncedState } from '../widget-components';
import { ProjectContentPreview } from '../widgets/content-preview';
import { Footer } from '../widgets/layout/footer';

export interface ProjectWidgetUIState {
  more?: boolean;
}

export interface GithubProject {
  project: ProjectV2 | null;
  contentCount?: CountContentTypesResult;
}

export const ProjectWidget = () => {
  const [githubProject] = useSyncedState<GithubProject>('githubProject', {
    project: null,
    contentCount: undefined,
  });

  const [openedMore, setOpenedMore] = useSyncedState<boolean>('openedMoreProject', true);

  const [lastSyncDate] = useSyncedState<undefined | string>('lastSync', undefined);

  const { title, id, shortDescription, url } = githubProject.project;

  const { openMore } = useAppendChild({ setOpenedMore });

  return (
    <AutoLayout
      verticalAlignItems={'center'}
      horizontalAlignItems={'center'}
      direction="vertical"
      width={'fill-parent'}
    >
      <IssueHeader
        title={
          <IssueHeaderTitle
            href={url}
            preLinkChildren={
              <SVG
                src={IconProjects('#57606A')}
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
        openedMore={openedMore}
        onClick={openMore}
      />
      <ProjectContent
        project={githubProject.project}
        contentCount={githubProject.contentCount}
        hidden={!openedMore}
      />

      <Footer
        githubEntity={{
          entityType: 'project',
          entity: { id: id, title: title },
        }}
        hidden={!openedMore}
        text={formatDate({
          value: lastSyncDate,
          type: 'full',
          locale: 'en-EN',
        })}
      />
    </AutoLayout>
  );
};
