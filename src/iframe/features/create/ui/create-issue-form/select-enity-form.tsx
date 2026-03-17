import type { GithubEntity } from '@/shared/lib/types/github';
import type { FormHTMLAttributes } from 'react';

import { useAppContext } from '@/shared/lib/contexts';
import { SearchEntityForm } from '@/shared/ui/forms';

export const SelectTypeForm = (props: FormHTMLAttributes<HTMLFormElement>) => {
  const { setGithubEntity, githubAccessToken } = useAppContext();

  const checkTypeSubmit = async (entity: GithubEntity) => {
    if (entity && (entity.entityType === 'repository' || entity.entityType === 'project')) {
      setGithubEntity(entity);
    } else {
      throw new Error('Please provide a valid link to a GitHub repository or project');
    }
  };

  return (
    <SearchEntityForm
      {...props}
      githubAccessToken={githubAccessToken}
      onFormSubmit={checkTypeSubmit}
      buttonText="Select"
      labelText="Repository or project URL *"
    />
  );
};
