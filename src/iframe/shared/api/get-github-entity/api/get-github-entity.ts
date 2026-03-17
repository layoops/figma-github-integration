import type { GithubEntity, GithubId } from '../../../lib/types/github';

import { githubPatterns } from '../../../lib/regex';
import { githubGraphqlApi } from '../../graphql/github-graphql-api';
import { ISSUE_ID_QUERY, PROJECT_ID_QUERY, REPO_ID_QUERY } from './github-entity-query';

async function getIssueFromGithubApi({
  data: { owner, repo, number },
  token,
}: {
  data: { owner: string; repo: string; number: number };
  token: string;
}): Promise<GithubId> {
  const response = await githubGraphqlApi({
    token,
    body: JSON.stringify({
      query: ISSUE_ID_QUERY,
      variables: { owner, repo, number },
    }),
  });

  const data = await response.json();
  return {
    id: data?.data?.repository?.issue?.id,
    title: data?.data?.repository?.issue?.title,
  };
}
async function getRepoFromGithubApi({
  data: { owner, repo },
  token,
}: {
  data: { owner: string; repo: string };
  token: string;
}): Promise<GithubId> {
  const response = await githubGraphqlApi({
    token,
    body: JSON.stringify({
      query: REPO_ID_QUERY,
      variables: { owner, repo },
    }),
  });

  const data = await response.json();
  return {
    id: data?.data?.repository?.id,
    title: data?.data?.repository?.name,
  };
}

async function getPRFromGithubApi({
  data: { owner, repo, number },
  token,
}: {
  data: { owner: string; repo: string; number: number };
  token: string;
}): Promise<GithubId> {
  const response = await githubGraphqlApi({
    token,
    body: JSON.stringify({
      query: ISSUE_ID_QUERY,
      variables: { owner, repo, number },
    }),
  });

  const data = await response.json();
  return {
    id: data?.data?.repository?.pullRequest?.id,
    title: data?.data?.repository?.pullRequest?.title,
  };
}

async function getProjectFromGithubApi({
  data: { owner, number },
  token,
}: {
  data: { owner: string; number: number };
  token: string;
}): Promise<GithubId> {
  const response = await githubGraphqlApi({
    token,
    body: JSON.stringify({
      query: PROJECT_ID_QUERY,
      variables: { owner, number },
    }),
  });

  const data = await response.json();
  return {
    id: data?.data?.repositoryOwner?.projectV2?.id as string,
    title: data?.data?.repositoryOwner?.projectV2?.title as string,
  };
}

export async function getGithubEntityFromUrl({
  url,
  token,
}: {
  url: string;
  token: string;
}): Promise<GithubEntity | null> {
  let match = url.match(githubPatterns.issue);
  if (match) {
    const [, owner, repo, number] = match;
    const issue = await getIssueFromGithubApi({
      data: { owner, repo, number: parseInt(number) },
      token: token,
    });
    return { entityType: 'issue', entity: issue };
  }
  match = url.match(githubPatterns.repository);
  if (match) {
    const [, owner, repo] = match;
    const repository = await getRepoFromGithubApi({
      data: { owner, repo },
      token,
    });
    return { entityType: 'repository', entity: repository };
  }

  match = url.match(githubPatterns.pullRequest);
  if (match) {
    const [, owner, repo, number] = match;
    const pr = await getPRFromGithubApi({
      data: { owner, repo, number: parseInt(number) },
      token: token,
    });
    return { entityType: 'pull-request', entity: pr };
  }

  match = url.match(githubPatterns.project);
  if (match) {
    const [, , name, number] = match;
    const project = await getProjectFromGithubApi({
      data: { owner: name, number: parseInt(number) },
      token: token,
    });
    return { entityType: 'project', entity: project };
  }

  return null;
}
