export type GithubPresetColors =
  | 'GRAY'
  | 'BLUE'
  | 'GREEN'
  | 'RED'
  | 'PINK'
  | 'PURPLE'
  | 'YELLOW'
  | 'ORANGE';

export type GithubEntityType = 'issue' | 'project' | 'pull-request';
export type GithubEntity = {
  entityType: GithubEntityType;
  entity: { id: string; title: string };
};
