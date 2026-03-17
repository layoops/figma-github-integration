export type GithubId = {
  id: string;
  title: string;
  owner?: string;
  name?: string;
};

export type GithubEntityType =
  | 'issue'
  | 'project'
  | 'pull-request'
  | 'repository'
  | 'repository-issues'
  | 'repository-pulls'
  | 'repository-projects';

export type GithubEntity = {
  entityType: GithubEntityType;
  entity: GithubId;
  originalUrl?: string;
};
