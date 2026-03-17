import type { ProjectV2 } from '@octokit/graphql-schema';

export type ContentTypeCounts = {
  [key: string]: number;
};

export type CountContentTypesResult = {
  totalContent: number;
  typeCounts: ContentTypeCounts;
  completedTasks: number;
};

export function countProjectContentTypes(data?: ProjectV2): CountContentTypesResult {
  const filteredNodes = data?.items.nodes?.filter(
    (node) => node?.content && Object.keys(node?.content).length !== 0
  );

  const totalContent = filteredNodes?.length;

  const typeCounts = filteredNodes?.reduce(
    (counts, node) => {
      const type = (node?.content && node.content.__typename) || 'Other';
      counts[type] = (counts[type] || 0) + 1;
      return counts;
    },
    {} as { [key: string]: number }
  );

  const completedTasks = filteredNodes?.filter(
    (node) => node?.content?.__typename === 'Issue' && node.content.state === 'CLOSED'
  ).length;

  return {
    totalContent: totalContent ?? 0,
    typeCounts: typeCounts ?? {},
    completedTasks: completedTasks ?? 0,
  };
}
