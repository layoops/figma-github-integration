import type { GithubEntity } from '../../../shared/lib/types/github';
import type { ProjectV2 } from '@octokit/graphql-schema';

import { openPluginUI } from '../../../shared/lib/helpers';
import { Button, IssueContentWrapper, TabGroup } from '../../../shared/ui/components';
import { AutoLayout, useSyncedState } from '../../../widget-components';
import { IssueBodySection } from '../../issue/ui';
import { ProjectOverviewSection } from './project-sections';

type ContentTypeCounts = {
  [key: string]: number;
};

export type CountContentTypesResult = {
  totalContent: number;
  typeCounts: ContentTypeCounts;
  completedTasks: number;
};

interface ProjectContentProps extends AutoLayoutProps {
  project: ProjectV2 | null;
  contentCount?: CountContentTypesResult;
}

type ProjectTab = 'Overview' | 'Body' | 'Comments';

export const openPluginProjectUI = (props: { githubEntity: GithubEntity }) => {
  openPluginUI({
    routeName: 'import',
    props: props ?? {},
    options: { visible: true },
  });
};

export const ProjectContent = ({ project, contentCount, ...rest }: ProjectContentProps) => {
  const [selectedTab, setSelectedTab] = useSyncedState<ProjectTab>('issueContentTab', 'Overview');

  const [projectTabs] = useSyncedState<ProjectTab[]>('projectTabs', () => {
    const tabs: ProjectTab[] = ['Overview'];
    if (project?.readme) {
      tabs.push('Body');
    }

    return tabs;
  });

  return (
    <IssueContentWrapper {...rest}>
      <TabGroup
        padding={{ horizontal: 12 }}
        tabs={projectTabs}
        selectedTab={selectedTab}
        onSelect={setSelectedTab}
      />
      <AutoLayout padding={12} spacing={12} direction="vertical" width="fill-parent">
        <ProjectOverviewSection hidden={selectedTab !== 'Overview'} contentCount={contentCount} />
        {projectTabs.includes('Body') && Boolean(project?.readme) && (
          <IssueBodySection
            id={project.id}
            type="body"
            hidden={selectedTab !== 'Body'}
            content={project?.readme}
            header={{
              left: {
                text: 'Description',
              },
            }}
          />
        )}
        <Button
          onClick={() =>
            openPluginProjectUI({
              githubEntity: {
                entityType: 'project',
                entity: { id: project.id, title: project.title },
              },
            })
          }
          size="medium"
          width="fill-parent"
          appearance="secondary"
          text="Import"
        />
      </AutoLayout>
    </IssueContentWrapper>
  );
};
