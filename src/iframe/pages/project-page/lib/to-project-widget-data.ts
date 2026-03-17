import type { ProjectWidgetData } from '@/global-shared/plugin-messages';
import type { ProjectV2 } from '@octokit/graphql-schema';

export function toProjectWidgetData(project: ProjectV2): ProjectWidgetData {
  return {
    id: project.id,
    title: project.title,
    shortDescription: project.shortDescription,
    readme: project.readme,
    items: project.items
      ? {
          nodes:
            project.items.nodes?.map((node) =>
              node
                ? {
                    type: node.type,
                    content: node.content
                      ? { id: node.content.id, title: node.content.title }
                      : null,
                  }
                : null
            ) ?? null,
        }
      : null,
  };
}
