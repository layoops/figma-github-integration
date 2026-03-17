import type { ChangeEvent, FormEvent, HTMLAttributes } from 'react';

import { useState } from 'react';

import { useAppContext } from '@/shared/lib/contexts';
import { Button, ErrorToaster, Form, TextInput } from '@/shared/ui/components';

import { importIssueFromQuery } from '../../model';

interface ImportIssueQuerySearchFormProps extends HTMLAttributes<HTMLElement> {}

const queryPlaceholder =
  'repo:your_owner/your_repo type:issue state:open label:some_label sort:created-asc';

export const ImportIssueQuerySearchForm = ({ ...rest }: ImportIssueQuerySearchFormProps) => {
  const [query, setQuery] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [quantity, setQuantity] = useState<number>(14);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  const { githubAccessToken } = useAppContext();

  const onSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      if (!githubAccessToken) {
        throw new Error('GitHub access token is missing');
      }
      if (!query.trim()) {
        throw new Error('Invalid GitHub Search Query. Please enter a valid query.');
      }
      await importIssueFromQuery({
        variables: { query: query.trim(), quantity },
        token: githubAccessToken,
      });
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      footer={
        <Button disabled={!query} type="submit" size="large" appearance="primary">
          Import
        </Button>
      }
      {...rest}
    >
      <TextInput
        id="issue_input"
        onChange={onChange}
        value={query}
        size="medium"
        placeholder={queryPlaceholder}
        label={'Issue query *'}
      />
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
      {error && <ErrorToaster status="error" text={[error]} />}
    </Form>
  );
};
