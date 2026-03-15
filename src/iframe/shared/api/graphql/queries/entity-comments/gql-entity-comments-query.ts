import type { IssueComment, PageInfo } from '@octokit/graphql-schema';

import { githubRequest } from '../../github-graphql-api';

const GQL_ENTITY_COMMENTS_QUERY = `
query EntityComments($id: ID!, $after: String, $first: Int = 4) {
  node(id: $id) {
    ... on Issue {
      comments(first: $first, after: $after) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          createdAt
          updatedAt
          bodyText
          bodyHTML
          url
          authorAssociation
          author {
            login
            url
            avatarUrl
          }
        }
      }
    }
    ... on PullRequest {
      comments(first: $first, after: $after) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          createdAt
          updatedAt
          bodyText
          bodyHTML
          url
          authorAssociation
          author {
            login
            url
            avatarUrl
          }
        }
      }
    }
  }
}`;

export type EntityCommentsPage = {
  totalCount: number;
  pageInfo: Pick<PageInfo, 'hasNextPage' | 'endCursor'>;
  nodes: (IssueComment | null)[];
};

type EntityCommentsResponse = {
  node: { comments?: EntityCommentsPage } | null;
};

export const fetchMoreEntityComments = async ({
  entityId,
  after,
  token,
  first = 4,
}: {
  entityId: string;
  after: string;
  token: string;
  first?: number;
}): Promise<EntityCommentsPage | null> => {
  const result = await githubRequest<EntityCommentsResponse>({
    query: GQL_ENTITY_COMMENTS_QUERY,
    variables: { id: entityId, after, first },
    token,
  });

  return result.node?.comments ?? null;
};
