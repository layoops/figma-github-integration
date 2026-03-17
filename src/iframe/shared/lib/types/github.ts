export interface GithubId {
  id: string;
  title: string;
}

export type GithubEntity = {
  entityType: 'issue' | 'project' | 'pull-request' | 'repository';
  entity: GithubId;
};
