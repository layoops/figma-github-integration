import type { GithubId } from '../../../lib/types/github';

import { githubRequest } from '../../graphql/github-graphql-api';
import {
  GQL_ISSUE_ID_QUERY,
  GQL_PROJECT_ID_QUERY,
  GQL_REPO_ID_QUERY,
} from '../../graphql/queries/entities';

export async function fetchIssue({
  owner,
  repo,
  number,
  token,
}: {
  owner: string;
  repo: string;
  number: number;
  token: string;
}): Promise<GithubId> {
  const variables = { owner, repo, number };
  const data = await githubRequest<{
    repository: {
      issue: { id: string; title: string };
    };
  }>({ query: GQL_ISSUE_ID_QUERY, variables, token });

  if (!data?.repository?.issue) {
    throw new Error('Issue not found');
  }

  return {
    id: data.repository.issue.id,
    title: data.repository.issue.title,
  };
}

export async function fetchPullRequest({
  owner,
  repo,
  number,
  token,
}: {
  owner: string;
  repo: string;
  number: number;
  token: string;
}): Promise<GithubId> {
  const variables = { owner, repo, number };
  const data = await githubRequest<{
    repository: {
      pullRequest: { id: string; title: string };
    };
  }>({ query: GQL_ISSUE_ID_QUERY, variables, token });

  if (!data?.repository?.pullRequest) {
    throw new Error('Pull Request not found');
  }

  return {
    id: data.repository.pullRequest.id,
    title: data.repository.pullRequest.title,
  };
}

export async function fetchRepository({
  owner,
  repo,
  token,
}: {
  owner: string;
  repo: string;
  token: string;
}): Promise<GithubId> {
  const variables = { owner, repo };

  const data = await githubRequest<{
    repository: {
      id: string;
      name: string;
    };
  }>({ query: GQL_REPO_ID_QUERY, variables, token });

  if (!data?.repository) {
    throw new Error('Repository not found');
  }

  return {
    id: data.repository.id,
    title: data.repository.name,
    owner,
    name: repo,
  };
}

export async function fetchProject({
  owner,
  number,
  token,
}: {
  owner: string;
  number: number;
  token: string;
}): Promise<GithubId> {
  const variables = { owner, number };
  const data = await githubRequest<{
    repositoryOwner: {
      projectV2: { id: string; title: string } | null;
    };
  }>({ query: GQL_PROJECT_ID_QUERY, variables, token });

  if (!data?.repositoryOwner?.projectV2) {
    throw new Error('Project not found');
  }

  return {
    id: data.repositoryOwner.projectV2.id,
    title: data.repositoryOwner.projectV2.title,
  };
}
