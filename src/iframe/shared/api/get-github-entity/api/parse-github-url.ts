import { githubPatterns } from '@/shared/lib/regex';

export type ParsedGithubEntity =
  | { type: 'issue' | 'pull-request'; owner: string; repo: string; number: number }
  | { type: 'repository'; owner: string; repo: string }
  | { type: 'project'; owner: string; number: number }
  | null;

export function parseGithubUrl(url: string): ParsedGithubEntity {
  let match = url.match(githubPatterns.issue);
  if (match) {
    const [, owner, repo, number] = match;
    return { type: 'issue', owner, repo, number: Number(number) };
  }

  match = url.match(githubPatterns.pullRequest);
  if (match) {
    const [, owner, repo, number] = match;
    return { type: 'pull-request', owner, repo, number: Number(number) };
  }

  match = url.match(githubPatterns.repository);
  if (match) {
    const [, owner, repo] = match;
    return { type: 'repository', owner, repo };
  }

  match = url.match(githubPatterns.project);
  if (match) {
    const [, , owner, number] = match;
    return { type: 'project', owner, number: Number(number) };
  }

  return null;
}
