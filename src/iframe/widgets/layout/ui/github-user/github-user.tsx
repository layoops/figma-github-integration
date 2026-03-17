import { clsx } from 'clsx';

import { useRevokeAccess } from '@/features/access';
import { useAppContext } from '@/shared/lib/contexts';
import { Button } from '@/shared/ui/components';
import { Avatar } from '@/shared/ui/components/avatar/avatar';
import { Skeleton } from '@/shared/ui/components/skeleton/skeleton';

import classes from './github-user.module.css';

export const GithubUser = () => {
  const { viewer, githubAccessToken, isOnline, isLoading } = useAppContext();
  const revoke = useRevokeAccess();

  return (
    <div className={clsx(classes.user, { hidden: !githubAccessToken })}>
      {isLoading || !viewer?.login ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '100%',
            width: '100%',
          }}
        >
          <Skeleton style={{ width: 150 }} />
          <Skeleton style={{ width: 150 }} />
        </div>
      ) : (
        <>
          {isOnline ? (
            <Avatar
              className={clsx({ invincible: !viewer?.login })}
              image={{ src: viewer?.avatarUrl }}
              text={viewer?.login}
            />
          ) : (
            <p>You are offline</p>
          )}
          <Button onClick={revoke} appearance="ghost" size="small">
            Revoke Access
          </Button>
        </>
      )}
    </div>
  );
};
