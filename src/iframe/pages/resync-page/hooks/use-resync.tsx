import type { GithubEntity } from '@/shared/lib/types';

import { useEffect } from 'react';

import { importIssueByIdToWidget } from '@/entities/issue';
import { importProjectByIdToWidget } from '@/entities/project';
import { importPullRequestToWidget } from '@/entities/pull-request';
import { MESSAGE_TYPES } from '@/global-shared/message-type';
import { useAppContext } from '@/shared/lib/contexts';
import { sendMessageToWidget } from '@/shared/lib/utils';

export const useResync = () => {
  const { githubAccessToken, propsFromWidget } = useAppContext();

  const githubEntity: GithubEntity | undefined = propsFromWidget?.githubEntity;
  const commentsFirst: number | undefined = propsFromWidget?.commentsFirst;

  useEffect(() => {
    if (!githubAccessToken) {
      return;
    }
    const resync = async () => {
      try {
        if (githubEntity?.entityType === 'issue') {
          await importIssueByIdToWidget({
            id: githubEntity.entity.id,
            token: githubAccessToken,
            commentsFirst,
          });
        } else if (githubEntity?.entityType === 'pull-request') {
          await importPullRequestToWidget({
            id: githubEntity.entity.id,
            token: githubAccessToken,
            commentsFirst,
          });
        } else if (githubEntity?.entityType === 'project') {
          await importProjectByIdToWidget({ id: githubEntity.entity.id, token: githubAccessToken });
        }
        sendMessageToWidget({ type: MESSAGE_TYPES.RESYNC_GITHUB_ISSUE_RESPONSE });
      } catch (error) {
        console.error("error doing 'resync'", error as Error);
        sendMessageToWidget({ type: MESSAGE_TYPES.RESYNC_ERROR });
      }
    };
    resync();
  }, [propsFromWidget, githubAccessToken]);

  return { githubEntity };
};
