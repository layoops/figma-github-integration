import type { GithubEntity } from '@/shared/lib/types';
import type { FormHTMLAttributes } from 'react';

import { MESSAGE_TYPES } from '@/external/message-type';
import { useAppContext } from '@/shared/lib/contexts';
import { SearchEntityForm } from '@/shared/ui/forms';

import { importIssue } from '../../model';

export const ImportIssueSearchForm = (props: FormHTMLAttributes<HTMLFormElement>) => {
  const { setGithubEntity, githubAccessToken, propsFromWidget, applicationSettings } =
    useAppContext();

  const importIssueSubmit = async (entity: GithubEntity) => {
    if (!entity?.entity.id || !githubAccessToken) {
      throw new Error('Invalid provided GitHub data or missing access token');
    }
    if (entity?.entityType === 'repository') {
      throw new Error('Please provide a valid link to a GitHub issue, pull repository or project');
    }

    switch (entity?.entityType) {
      case 'issue':
        await importIssue({
          id: entity?.entity.id,
          token: githubAccessToken,
          settings: applicationSettings,
        });
        break;
      case 'pull-request':
        await importIssue({
          id: entity.entity.id,
          type: MESSAGE_TYPES.IMPORT_GITHUB_PULL_REQUEST,
          token: githubAccessToken,
          settings: applicationSettings,
        });
        break;
      case 'project':
        setGithubEntity(entity);
        break;
    }
  };

  return (
    <SearchEntityForm
      {...props}
      githubAccessToken={githubAccessToken}
      issueUrl={propsFromWidget?.issueUrl}
      onFormSubmit={importIssueSubmit}
      buttonText="Import"
      labelText="Issue/PR/Project URL *"
    />
  );
};
