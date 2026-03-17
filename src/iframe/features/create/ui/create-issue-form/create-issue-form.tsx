import type { ChangeEvent, FormEvent, HTMLAttributes } from 'react';

import { useReducer, useState } from 'react';

import { useAppContext } from '@/shared/lib/contexts';
import {
  Button,
  ErrorToaster,
  Form,
  GithubEntityTitle,
  TextArea,
  TextInput,
} from '@/shared/ui/components';

import { linkCreatedDraftIssue } from '../../model/create-draft-issue';
import { linkCreatedIssue } from '../../model/create-issue';

interface CreateIssueSearchFormProps extends HTMLAttributes<HTMLElement> {
  issueUrl?: string;
}

type FormState = {
  title: string;
  description: string;
};

const initialState: FormState = {
  title: '',
  description: '',
};

const formReducer = (state: FormState, event: { name: string; value: string }) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

export const CreateIssueSearchForm = ({ className, ...rest }: CreateIssueSearchFormProps) => {
  const [formData, setFormData] = useReducer(formReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { githubEntity, githubAccessToken } = useAppContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const onSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      if (!githubAccessToken) return;
      githubEntity?.entityType === 'repository' &&
        linkCreatedIssue({
          variables: {
            id: githubEntity?.entity.id,
            passedData: { title: formData.title, body: formData.description },
          },
          token: githubAccessToken,
        });
      githubEntity?.entityType === 'project' &&
        linkCreatedDraftIssue({
          variables: {
            id: githubEntity?.entity.id,
            passedData: { title: formData.title, body: formData.description },
          },
          token: githubAccessToken,
        });
    } catch (error) {
      setIsLoading(false);
      setError((error as Error).message);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      footer={
        <Button
          isLoading={isLoading}
          disabled={!formData.title}
          type="submit"
          size="large"
          appearance="primary"
        >
          {githubEntity?.entityType === 'repository' ? 'Create Issue' : 'Create Draft Issue'}
        </Button>
      }
      className={className}
      {...rest}
    >
      {githubEntity?.entityType && (
        <GithubEntityTitle login={githubEntity?.entityType} title={githubEntity?.entity.title} />
      )}
      <TextInput
        id="title"
        name={'title'}
        onChange={handleChange}
        value={formData.title}
        size="medium"
        label={'Title *'}
      />
      <TextArea
        rows={4}
        id="description"
        name={'description'}
        value={formData.description}
        onChange={handleChange}
        size="medium"
        labelText={'Description'}
      />
      {error && <ErrorToaster status="error" text={[error]} />}
    </Form>
  );
};
