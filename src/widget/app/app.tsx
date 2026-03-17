import { WidgetInit } from '../pages/init-widget';
import { IssueWidget } from '../pages/issue-widget';
import { ProjectWidget } from '../pages/project-widget';
import { PullRequestWidget } from '../pages/pull-request-widget';
import { useWidgetInit } from '../shared/lib/hooks';
import { Layout } from '../widgets/layout';

function MainWidget() {
  const { widgetType } = useWidgetInit();

  return (
    <Layout>
      {widgetType === 'init' && <WidgetInit />}
      {widgetType === 'issue' && <IssueWidget />}
      {widgetType === 'pull-request' && <PullRequestWidget />}
      {widgetType === 'project' && <ProjectWidget />}
    </Layout>
  );
}

figma.widget.register(MainWidget);
