import type { CountContentTypesResult } from '../../lib';
import type { GithubEntity } from '@/shared/lib/types';
import type { Organization, ProjectV2, User } from '@octokit/graphql-schema';
import type { ChangeEvent, FormEvent } from 'react';

import { useEffect, useState } from 'react';

import { useAppContext } from '@/shared/lib/contexts';
import {
  Button,
  Checkbox,
  Form,
  GithubEntityTitle,
  Loader,
  TextInput,
} from '@/shared/ui/components';

import { handleProject, importProject } from '../../model';
import classes from './import-project-form.module.css';

type FormField = {
  value: boolean;
  label: string;
};

type FormData = Record<string, FormField>;

interface ImportProjectFormProps {
  passedGithubEntity?: GithubEntity;
}

export const ImportProjectForm = ({ passedGithubEntity }: ImportProjectFormProps) => {
  const { githubEntity, setGithubEntity, githubAccessToken } = useAppContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [project, setProject] = useState<
    | {
        projectData: ProjectV2;
        contentCount: CountContentTypesResult;
      }
    | undefined
  >(undefined);

  const [quantity, setQuantity] = useState<number>(80);

  const [formData, setFormData] = useState<FormData>({
    includeIssues: { value: false, label: 'Include Issue' },
    includeDraftIssues: { value: false, label: 'Include Draft Issues' },
    includePullRequests: { value: false, label: 'Include Pull Requests' },
  });

  useEffect(() => {
    passedGithubEntity && setGithubEntity(() => passedGithubEntity);
  }, []);

  useEffect(() => {
    setLoading(true);

    async function fetchMyAPI() {
      const linkedProject =
        githubEntity?.entity.id &&
        githubAccessToken &&
        (await handleProject({
          variables: {
            id: githubEntity?.entity.id,
            includeIssues: true,
            includeDraftIssues: true,
            includePullRequests: true,
          },
          token: githubAccessToken,
        }));

      setProject(linkedProject || undefined);
      setLoading(false);
    }

    try {
      fetchMyAPI();
    } catch (error) {
      console.error(error as Error);
    }
  }, [githubEntity?.entity.id]);

  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value: checked,
      },
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!githubAccessToken) return;
    setLoading(true);
    if (githubEntity?.entity.id) {
      const projectData = Object.keys(formData).reduce(
        (acc, key) => {
          acc[key] = formData[key].value;
          return acc;
        },
        {} as Record<string, boolean>
      );

      await importProject({
        variables: {
          id: githubEntity?.entity.id,
          includeIssues: projectData.includeIssues,
          includeDraftIssues: projectData.includeDraftIssues,
          includePullRequests: projectData.includePullRequests,
          quantity: quantity,
        },
        token: githubAccessToken,
      });

      setLoading(false);
    }
  };

  const isAnyFieldTrue = Object.values(formData).some((field) => field.value);

  if (loading && !project?.projectData) {
    return <Loader theme="dark" size="medium" />;
  }
  return (
    <Form
      footer={
        <Button
          disabled={!isAnyFieldTrue}
          size="large"
          type="submit"
          fullWidth={false}
          appearance="primary"
        >
          Import Project
        </Button>
      }
      onSubmit={handleSubmit}
    >
      <GithubEntityTitle
        href={project?.projectData?.url}
        login={(project?.projectData?.owner as User | Organization)?.login}
        title={project?.projectData?.title}
      />
      {Object.keys(formData).map((key) => (
        <div key={key} className={classes['project-field']}>
          <Checkbox
            onChange={handleToggle}
            key={key}
            id={key}
            name={key}
            checked={formData[key].value}
            label={formData[key].label}
          />
        </div>
      ))}
      <TextInput
        id="issue_input"
        onChange={(event) => {
          setQuantity(Number(event.target.value));
        }}
        value={quantity}
        size="medium"
        type="number"
        label={'Import Quantity'}
      />
    </Form>
  );
};
