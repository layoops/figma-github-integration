import type { GithubEntity } from '../../../lib/types';
import type { ChangeEvent, FormEvent, FormHTMLAttributes } from 'react';

import { useEffect, useState } from 'react';

import { getGithubEntityFromUrl } from '../../../api/get-github-entity';
import { githubPatterns } from '../../../lib/regex';
import { Button, ErrorToaster, Form, TextInput } from '../../components';

export interface SearchEntityFormProps extends FormHTMLAttributes<HTMLFormElement> {
  issueUrl?: string;
  onFormSubmit: (entity: GithubEntity) => Promise<void>;
  buttonText?: string;
  labelText?: string;
  githubAccessToken: string | undefined;
}

export const SearchEntityForm = ({
  children,
  issueUrl = '',
  onFormSubmit,
  buttonText = 'Submit',
  labelText = 'Input Label',
  className,
  githubAccessToken,
  ...rest
}: SearchEntityFormProps) => {
  const [inputValue, setInputValue] = useState<string>(issueUrl);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isUrlValid, setIsUrlValid] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateUrl = (url: string) => {
    const isValid = githubPatterns.github.test(url);
    setIsUrlValid(isValid);
  };

  useEffect(() => {
    setInputValue(issueUrl);
    validateUrl(issueUrl);
  }, [issueUrl]);

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    setInputValue(value);
    validateUrl(value);

    setError(undefined);
  };

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      if (!githubAccessToken) {
        throw new Error('GitHub access token is missing');
      }

      if (!inputValue.trim() || !isUrlValid) {
        throw new Error('Invalid GitHub URL. Please enter a valid GitHub URL.');
      }

      const entity = await getGithubEntityFromUrl({
        url: inputValue.trim(),
        token: githubAccessToken,
      });

      if (!entity?.entity.id) {
        throw new Error(
          'Unable to process the provided GitHub data. Please check if the item exists and try again.'
        );
      }

      await onFormSubmit(entity);
      setInputValue('');
      setIsLoading(false);
    } catch (error) {
      setError({
        message: (error as Error).message || 'An error occurred',
        name: (error as Error).name || 'unknown-error',
      });
      setIsLoading(false);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      footer={
        <Button
          disabled={!inputValue.trim()}
          type="submit"
          isLoading={isLoading}
          size="large"
          appearance="primary"
        >
          {buttonText}
        </Button>
      }
      className={className}
      {...rest}
    >
      <TextInput
        id="common_form_input"
        onChange={onChange}
        value={inputValue}
        size="medium"
        label={labelText}
      />
      {children}
      {error && <ErrorToaster text={[error.message]} status="error" />}
    </Form>
  );
};
