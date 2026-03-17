import type { DraftIssue, Issue, ProjectV2, PullRequest } from '@octokit/graphql-schema';

import { useWidgetNodeId } from '../../../widget-components';

const createGithubIssue = (data: Issue | DraftIssue) => ({
  githubIssue: data,
  lastSynced: new Date().toISOString(),
  widgetType: 'issue',
});

const createGithubPullRequest = (data: PullRequest) => ({
  pullRequest: data,
  lastSynced: new Date().toISOString(),
  widgetType: 'pull-request',
});

const createGithubProject = (data: { project: ProjectV2 }) => ({
  githubProject: data,
  lastSynced: new Date().toISOString(),
  widgetType: 'project',
});

const calculateOffset = (lastWidgetNode: WidgetNode) => {
  let yOffset = 0;
  let xOffset = 0;

  if (lastWidgetNode) {
    yOffset += lastWidgetNode.y + lastWidgetNode.height + 40;
    xOffset += lastWidgetNode.x;
  } else {
    yOffset += 300;
    xOffset += 500;
  }

  return { yOffset, xOffset };
};

export const useGithubImport = () => {
  const widgetNodeId = useWidgetNodeId();

  const findOrCreateWidgetNode = (): WidgetNode | null => {
    const widgetNode = figma.getNodeById(widgetNodeId) as WidgetNode;

    if (!isValidWidgetNode(widgetNode)) {
      console.error('Widget node not found.');
      return null;
    }

    return widgetNode;

    function isValidWidgetNode(widgetNode: WidgetNode | null): widgetNode is WidgetNode {
      return widgetNode !== null && widgetNode !== undefined;
    }
  };

  const importGithubIssue = async ({
    data,
    parentPosition,
  }: {
    data: Issue | DraftIssue;
    parentPosition?: { x: number; y: number };
  }) => {
    try {
      const widgetNode = findOrCreateWidgetNode();
      const id = data?.id;

      if (!id) return;

      const widgetId = widgetNode?.widgetId;

      const allWidgetNodes: WidgetNode[] = figma.currentPage.findAll((node) => {
        return node?.type === 'WIDGET';
      }) as WidgetNode[];

      const myWidgetNodes: WidgetNode[] = allWidgetNodes.filter((node) => {
        return node?.widgetId === widgetId;
      });

      const preExistingGithubIssueWidget =
        id && myWidgetNodes?.find((node) => node?.widgetSyncedState?.githubIssue?.id === id);

      if (preExistingGithubIssueWidget) {
        const { issueTabs, ...rest } = preExistingGithubIssueWidget.widgetSyncedState;
        preExistingGithubIssueWidget.setWidgetSyncedState({
          ...rest,
          githubIssue: data,
          lastSynced: new Date().toISOString(),
        });

        return;
      }

      if (typeof data !== 'object' || data === null) {
        console.error('Invalid data type for githubIssue');
        return;
      }

      let clonedNode = widgetNode?.cloneWidget(createGithubIssue(data));

      if (!clonedNode) {
        clonedNode = allWidgetNodes[allWidgetNodes.length - 1].cloneWidget(createGithubIssue(data));
      }

      const { yOffset, xOffset } = calculateOffset(
        myWidgetNodes.length
          ? myWidgetNodes[myWidgetNodes.length - 1]
          : allWidgetNodes[allWidgetNodes.length - 1]
      );

      clonedNode.y = yOffset;
      clonedNode.x = parentPosition?.x ?? xOffset;

      return clonedNode;
    } catch (error) {
      console.error(`Error doing 'createLinkedWidget'`, error);
    }
  };

  const importGithubPullRequest = async ({
    data,
    type,
    parentPosition,
  }: {
    data: PullRequest;
    type?: 'import-github-pull-request' | 'import-github-pull-request-project';
    parentPosition?: { x: number; y: number };
  }) => {
    const findOrCreateWidgetNode = (): WidgetNode | null => {
      function isValidWidgetNode(widgetNode: WidgetNode | null): widgetNode is WidgetNode {
        return widgetNode !== null && widgetNode !== undefined;
      }

      const widgetNode = figma.getNodeById(widgetNodeId) as WidgetNode;

      if (!isValidWidgetNode(widgetNode)) {
        console.error('Widget node not found.');
        return null;
      }

      return widgetNode;
    };
    const widgetNode = findOrCreateWidgetNode();

    try {
      const id = data.id;
      const widgetId = widgetNode?.widgetId;
      const allWidgetNodes = figma.currentPage.findAll(
        (node) => node.type === 'WIDGET'
      ) as WidgetNode[];

      const myWidgetNodes = allWidgetNodes.filter((node) => node?.widgetId === widgetId);

      const preExistingGithubPullRequestWidget =
        id && myWidgetNodes?.find((node) => node?.widgetSyncedState?.pullRequest?.id === id);

      if (preExistingGithubPullRequestWidget) {
        const { pullRequestTabs, ...rest } = preExistingGithubPullRequestWidget.widgetSyncedState;
        preExistingGithubPullRequestWidget.setWidgetSyncedState({
          ...rest,
          pullRequest: data,
          lastSynced: new Date().toISOString(),
        });
        if (type === 'import-github-pull-request') {
          figma.closePlugin();
        }
        return;
      }

      if (typeof data !== 'object' || data === null) {
        console.error('Invalid data type for githubIssue');
        return;
      }

      let clonedNode = widgetNode?.cloneWidget(createGithubPullRequest(data));
      if (!clonedNode) {
        clonedNode = allWidgetNodes[allWidgetNodes.length - 1].cloneWidget(
          createGithubPullRequest(data)
        );
      }

      const { yOffset, xOffset } = calculateOffset(
        myWidgetNodes.length
          ? myWidgetNodes[myWidgetNodes.length - 1]
          : allWidgetNodes[allWidgetNodes.length]
      );

      clonedNode.y = yOffset;
      clonedNode.x = parentPosition?.x ?? xOffset;
    } catch (error) {
      console.error(`Error in importGithubPullRequest`, error);
    }
  };

  const importGithubProject = async ({ data }: { data: { project: ProjectV2 } }) => {
    try {
      const widgetNode = findOrCreateWidgetNode();

      const { project } = data;
      const id = project.id;
      const widgetId = widgetNode?.widgetId;
      const allWidgetNodes = figma.currentPage.findAll(
        (node) => node.type === 'WIDGET'
      ) as WidgetNode[];
      const myWidgetNodes = allWidgetNodes.filter((node) => node.widgetId === widgetId);
      let projectNode: WidgetNode;

      const preExistingGithubWidget =
        id &&
        myWidgetNodes.find((node) => node.widgetSyncedState?.githubProject?.project?.id === id);

      if (preExistingGithubWidget) {
        preExistingGithubWidget.setWidgetSyncedState(createGithubProject(data));
        projectNode = preExistingGithubWidget;
      } else {
        projectNode = widgetNode.cloneWidget(createGithubProject(data));

        if (!projectNode) {
          projectNode = allWidgetNodes[allWidgetNodes.length - 1].cloneWidget(
            createGithubProject(data)
          );
        }

        projectNode.x = widgetNode?.x + widgetNode?.width + 40;
      }
    } catch (error) {
      console.error(`Error in importGithubProject`, error);
    }
  };

  const importGithubEntityByQuery = async ({
    data,
  }: {
    data: Issue | DraftIssue | PullRequest;
  }) => {
    try {
      switch (data.__typename) {
        case 'Issue':
        case 'DraftIssue':
          importGithubIssue({ data: data });
          break;
        case 'PullRequest':
          importGithubPullRequest({ data: data });
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Error in importGithubEntityByQuery`, error);
    }
  };

  return {
    importGithubIssue,
    importGithubEntityByQuery,
    importGithubPullRequest,
    importGithubProject,
  };
};
