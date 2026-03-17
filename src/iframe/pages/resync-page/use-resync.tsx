import type { GithubEntity } from '@/shared/lib/types';

import { useEffect } from 'react';

import { MESSAGE_TYPES } from '@/external/message-type';
import { importIssue } from '@/features/import';
import { useAppContext } from '@/shared/lib/contexts';

export const useResync = () => {
  const { githubAccessToken, propsFromWidget, applicationSettings } = useAppContext();

  const githubEntity = propsFromWidget?.githubEntity as GithubEntity;

  useEffect(() => {
    if (!githubAccessToken) return;
    const resyncIssue = async () => {
      try {
        if (githubEntity?.entityType === 'issue' || githubEntity?.entityType === 'pull-request') {
          await importIssue({
            id: githubEntity?.entity.id,
            token: githubAccessToken,
            settings: applicationSettings,
            type:
              githubEntity?.entityType === 'pull-request'
                ? MESSAGE_TYPES.IMPORT_GITHUB_PULL_REQUEST
                : MESSAGE_TYPES.IMPORT_GITHUB_ISSUE,
          });
        }
        window.parent.postMessage(
          {
            pluginMessage: {
              type: MESSAGE_TYPES.RESYNC_GITHUB_ISSUE_RESPONSE,
            },
          },
          '*'
        );
      } catch (error) {
        console.error("error doing 'resyncIssue'", error as Error);
        window.parent.postMessage(
          { pluginMessage: { type: MESSAGE_TYPES.RESYNC_ERROR, data: {} } },
          '*'
        );
      }
    };
    resyncIssue();
  }, [propsFromWidget, githubAccessToken]);

  return { githubEntity };
};
