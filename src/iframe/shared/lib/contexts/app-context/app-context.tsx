import type { GlobalError } from '../../errors/types';
import type { ApplicationSettings } from '../../types';
import type { WidgetToIframeMessage } from '@/global-shared/plugin-messages';
import type { User as UserType } from '@octokit/graphql-schema';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { MESSAGE_TYPES } from '@/global-shared/message-type';
import { ROUTES, ROUTES_MAP } from '@/global-shared/routes-map';
import { router } from '@/shared/routing';

import { useGitHubViewer } from '../../../api/get-github-user';
import { UNAUTHORIZED_EVENT } from '../../auth';
import { GLOBAL_ERROR_EVENT } from '../../errors/map-error';
import { useTranslation } from '../internationalization-context';

type AppContextProps = {
  githubAccessToken: string | undefined;
  setGithubAccessToken: Dispatch<SetStateAction<string | undefined>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  viewer: UserType | undefined;
  setViewer: Dispatch<SetStateAction<UserType | undefined>>;
  propsFromWidget: any;
  applicationSettings?: ApplicationSettings;
  setApplicationSettings: Dispatch<SetStateAction<ApplicationSettings | undefined>>;
  isOnline: boolean;
  setGlobalError: Dispatch<SetStateAction<GlobalError | null>>;
  globalError: GlobalError | null;
};

export const AppContext = createContext<AppContextProps>({
  githubAccessToken: undefined,
  setGithubAccessToken: () => {},
  isLoading: false,
  setIsLoading: () => {},
  viewer: undefined,
  setViewer: () => {},
  propsFromWidget: {},
  applicationSettings: undefined,
  setApplicationSettings: () => {},
  isOnline: true,
  setGlobalError: () => {},
  globalError: null,
});

const OFFLINE_TIMEOUT = 3000;
const ONLINE_TIMEOUT = 1000;

export function useAppContextSetup(): AppContextProps {
  const { setLocale } = useTranslation();
  const [propsFromWidget, setPropsFromWidget] = useState<any>({});
  const [globalError, setGlobalError] = useState<GlobalError | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [githubAccessToken, setGithubAccessToken] = useState<string | undefined>(undefined);
  const [applicationSettings, setApplicationSettings] = useState<ApplicationSettings | undefined>(
    undefined
  );

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const [viewer, setViewer] = useState<UserType | undefined>(undefined);

  const { data: viewerData, error: viewerError } = useGitHubViewer(githubAccessToken);

  useEffect(() => {
    if (viewerData) {
      setViewer(viewerData);
      setIsLoading(false);
    }
  }, [viewerData]);

  const queryClient = useQueryClient();

  useEffect(() => {
    const handleLogout = () => {
      setGithubAccessToken(undefined);
      setViewer(undefined);
      setApplicationSettings(undefined);

      queryClient.clear();

      router.navigate({ to: '/auth', replace: true });
      setIsLoading(false);
    };

    const onUnauthorized = () => {
      handleLogout();
    };

    window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized);

    return () => {
      window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
    };
  }, [queryClient]);

  useEffect(() => {
    const handleGlobalErrorEvent = (event: Event) => {
      const customEvent = event as CustomEvent<GlobalError>;

      if (customEvent.detail) {
        setGlobalError(customEvent.detail);
      }
    };

    window.addEventListener(GLOBAL_ERROR_EVENT, handleGlobalErrorEvent);

    return () => {
      window.removeEventListener(GLOBAL_ERROR_EVENT, handleGlobalErrorEvent);
    };
  }, []);

  const handleOffline = useCallback(() => {
    setTimeout(() => setIsOnline(false), OFFLINE_TIMEOUT);
  }, []);

  const handleOnline = useCallback(() => {
    setTimeout(() => setIsOnline(true), ONLINE_TIMEOUT);
  }, []);

  useEffect(() => {
    setIsLoading(true);

    const handleWindowMessage = (event: MessageEvent<{ pluginMessage: WidgetToIframeMessage }>) => {
      const msg = event.data?.pluginMessage;

      if (!msg) {
        return;
      }

      if (msg.type === MESSAGE_TYPES.SET_ROUTE) {
        const { settings, githubAuthToken, locale, route, props } = msg.data || {};

        if (settings) {
          setApplicationSettings(settings);
        }

        if (locale) {
          setLocale(locale);
        }

        setPropsFromWidget(props);

        if (githubAuthToken) {
          setGithubAccessToken(githubAuthToken);

          router.update({
            context: {
              ...router.options.context,
              auth: {
                token: githubAuthToken,
                settings: settings,
              },
            },
          });

          router.navigate({ to: route, replace: true });
        } else {
          router.navigate({ to: ROUTES_MAP[ROUTES.AUTH], replace: true });
          setIsLoading(false);
        }
      }
    };

    window.addEventListener('message', handleWindowMessage);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('message', handleWindowMessage);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const isGlobalLoading = isLoading || (!!githubAccessToken && !viewer && !viewerError);

  return {
    isOnline,
    setGithubAccessToken,
    githubAccessToken,
    isLoading: isGlobalLoading,
    setIsLoading,
    setViewer,
    viewer,
    propsFromWidget,
    applicationSettings,
    setApplicationSettings,
    globalError,
    setGlobalError,
  };
}

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const value = useAppContextSetup();
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const value = useContext(AppContext);
  return value;
};
