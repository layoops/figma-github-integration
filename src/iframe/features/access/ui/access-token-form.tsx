import type { ChangeEvent, FormEvent } from 'react';

import { useRef, useState } from 'react';

import { MESSAGE_TYPES } from '@/external/message-type';
import { getViewer } from '@/shared/api/get-github-user';
import { useAppContext } from '@/shared/lib/contexts';
import { partiallyHideText } from '@/shared/lib/helpers/partially-hide-text';
import {
  Button,
  ButtonIcon,
  ErrorToaster,
  Form,
  FormTitle,
  TextInput,
} from '@/shared/ui/components';
import { IconEye, IconEyeClosed, IconTrash } from '@/shared/ui/icons';

import { useRevokeAccess } from '../lib/revoke-access';

export const AccessTokenForm = () => {
  const revoke = useRevokeAccess();
  const { githubAccessToken } = useAppContext();
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isHidden, setIsHidden] = useState(true);
  const tokenRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setToken(value);
  };

  const toggleVisibility = () => {
    if (tokenRef.current) {
      tokenRef.current.type = tokenRef.current.type === 'password' ? 'text' : 'password';
      setIsHidden((prev) => !prev);
    }
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const viewer = await getViewer({ token: token });
      setIsLoading(false);
      viewer &&
        parent.postMessage(
          {
            pluginMessage: {
              type: MESSAGE_TYPES.SEND_GITHUB_TOKEN,
              token: token,
            },
          },
          '*'
        );
    } catch (error) {
      setError(error as Error);
      setIsLoading(false);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      footer={
        !githubAccessToken && (
          <Button
            isLoading={isLoading}
            type="submit"
            disabled={!token}
            size="large"
            appearance="primary"
          >
            Add Token
          </Button>
        )
      }
    >
      <FormTitle text="Access Token" />
      <TextInput
        ref={tokenRef}
        value={githubAccessToken ? partiallyHideText(githubAccessToken) : token}
        onChange={handleChange}
        id="access_token"
        type={githubAccessToken ? 'text' : 'password'}
        size="medium"
        fullWidth
        readOnly={githubAccessToken ? true : false}
        label={'Access Token (with the `repo` scope)'}
        rightChildren={
          !githubAccessToken ? (
            <ButtonIcon
              isActive={!isHidden}
              type="button"
              appearance="ghost"
              size="medium"
              onClick={toggleVisibility}
            >
              {isHidden ? <IconEye size="medium" /> : <IconEyeClosed size="medium" />}
            </ButtonIcon>
          ) : (
            <ButtonIcon onClick={revoke} appearance="ghost" size="medium">
              <IconTrash />
            </ButtonIcon>
          )
        }
      />
      {error && <ErrorToaster text={[error.message]} status="error" />}
    </Form>
  );
};
