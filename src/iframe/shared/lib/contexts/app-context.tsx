import type { GithubEntity } from '../types/github';
import type { ApplicationSettings } from '@/entities/settings';
import type { User as UserType } from '@octokit/graphql-schema';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MESSAGE_TYPES } from '@/external/message-type';

import { getViewer } from '../../api/get-github-user';

interface AppContextProps {
  githubEntity?: GithubEntity;
  setGithubEntity: Dispatch<SetStateAction<GithubEntity | undefined>>;
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
}

export const AppContext = createContext<AppContextProps>({
  githubEntity: undefined,
  setGithubEntity: () => {},
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
});

const OFFLINE_TIMEOUT = 3000;
const ONLINE_TIMEOUT = 1000;

export function useAppContextSetup(): AppContextProps {
  const [githubEntity, setGithubEntity] = useState<GithubEntity | undefined>(undefined);
  const [propsFromWidget, setPropsFromWidget] = useState<any>({});

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [githubAccessToken, setGithubAccessToken] = useState<string | undefined>(undefined);
  const [applicationSettings, setApplicationSettings] = useState<ApplicationSettings | undefined>(
    undefined
  );

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const [viewer, setViewer] = useState<UserType | undefined>(undefined);

  const navigate = useNavigate();

  async function fetchUser(token?: string) {
    if (token) {
      const viewer = await getViewer({
        token: token,
      });
      setViewer(viewer);
      setIsLoading(false);
    }
  }

  const handleOffline = useCallback(() => {
    setTimeout(() => setIsOnline(false), OFFLINE_TIMEOUT);
  }, []);

  const handleOnline = useCallback(() => {
    setTimeout(() => setIsOnline(true), ONLINE_TIMEOUT);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const handleWindowMessage = (
      event: MessageEvent<{
        pluginMessage: {
          type: MESSAGE_TYPES;
          data: {
            route: string;
            props?: any;
            githubAuthToken?: string;
            settings?: ApplicationSettings;
          };
        };
      }>
    ) => {
      if (event.data.pluginMessage.type === MESSAGE_TYPES.ROUTE_UPDATE) {
        setPropsFromWidget(event.data.pluginMessage.data.props);
        window.parent.postMessage(
          { pluginMessage: { type: MESSAGE_TYPES.GET_GITHUB_AUTH_TOKEN } },
          '*'
        );
        navigate('/' + event.data.pluginMessage.data.route);
      }
      if (event.data.pluginMessage.type === MESSAGE_TYPES.GET_GITHUB_AUTH_TOKEN_RESPONSE) {
        setIsLoading(true);
        const token = event.data.pluginMessage.data.githubAuthToken;
        const settings = event.data.pluginMessage.data.settings;

        setApplicationSettings(settings);
        setGithubAccessToken(token);
        fetchUser(token);
      }
      setIsLoading(false);
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

  return {
    githubEntity,
    isOnline,
    setGithubEntity,
    setGithubAccessToken,
    githubAccessToken,
    isLoading,
    setIsLoading,
    setViewer,
    viewer,
    propsFromWidget,
    applicationSettings,
    setApplicationSettings,
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
