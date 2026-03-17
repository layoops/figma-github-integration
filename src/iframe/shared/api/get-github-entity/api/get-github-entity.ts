import type { GithubEntity } from '@/shared/lib/types';
import type { GithubEntityType } from '@/shared/lib/types/github';

import { githubPatterns } from '@/shared/lib/regex';

import {
  fetchIssue,
  fetchProject,
  fetchPullRequest,
  fetchRepository,
} from './github-entity-fetchers';

export async function resolveGithubEntityFromUrl({
  url,
  token,
}: {
  url: string;
  token: string;
}): Promise<GithubEntity | null> {
  const lowercasedUrl = url.toLowerCase();

  let match = lowercasedUrl.match(githubPatterns.issue);
  if (match) {
    const [, owner, repo, number] = match;
    return {
      entityType: 'issue',
      entity: await fetchIssue({
        owner,
        repo,
        number: Number(number),
        token,
      }),
      originalUrl: url,
    };
  }

  match = lowercasedUrl.match(githubPatterns.pullRequest);
  if (match) {
    const [, owner, repo, number] = match;
    return {
      entityType: 'pull-request',
      entity: await fetchPullRequest({
        owner,
        repo,
        number: Number(number),
        token,
      }),
      originalUrl: url,
    };
  }

  match = lowercasedUrl.match(githubPatterns.project);
  if (match) {
    const [, , owner, number] = match;
    return {
      entityType: 'project',
      entity: await fetchProject({
        owner,
        number: Number(number),
        token,
      }),
      originalUrl: url,
    };
  }

  match = lowercasedUrl.match(githubPatterns.repository);
  if (match) {
    const [, owner, repo] = match;
    const repoBaseUrl = `https://github.com/${owner}/${repo}`;

    let entityType: GithubEntityType = 'repository';

    if (lowercasedUrl.startsWith(`${repoBaseUrl}/issues`)) {
      entityType = 'repository-issues';
    } else if (lowercasedUrl.startsWith(`${repoBaseUrl}/pulls`)) {
      entityType = 'repository-pulls';
    } else if (lowercasedUrl.startsWith(`${repoBaseUrl}/projects`)) {
      entityType = 'repository-projects';
    }

    if (entityType === 'repository') {
      entityType = 'repository-issues';
    }

    return {
      entityType: entityType,
      entity: await fetchRepository({
        owner,
        repo,
        token,
      }),
      originalUrl: url,
    };
  }

  return null;
}
