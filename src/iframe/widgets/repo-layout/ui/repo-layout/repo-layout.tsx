import { createContext, useContext, useState } from 'react';
import { SkeletonBox } from '@primer/react';
import { getRouteApi, Outlet } from '@tanstack/react-router';

import { useTranslation } from '@/shared/lib/contexts';
import { EntityPreviewTitle } from '@/shared/ui';
import { PageContentLayout } from '@/widgets/page-content-layout';

import { RepoNavigation } from '../repo-navigation';
import classes from './repo-layout.module.css';

const routeApi = getRouteApi('/_layout/_protected/repo/$id');

export type RepoLayoutOutletContext = {
  footerLeftContainer: HTMLDivElement | null;
  footerRightContainer: HTMLDivElement | null;
};

const RepoLayoutFooterContext = createContext<RepoLayoutOutletContext | null>(null);

export const useRepoLayoutFooter = () => {
  const ctx = useContext(RepoLayoutFooterContext);
  if (!ctx) {
    throw new Error('useRepoLayoutFooter must be used within RepoLayout');
  }
  return ctx;
};

export const RepoLayout = () => {
  const { t } = useTranslation();
  const repo = routeApi.useLoaderData({ select: (data) => data.node });

  const [footerLeftContainer, setFooterLeftContainer] = useState<HTMLDivElement | null>(null);
  const [footerRightContainer, setFooterRightContainer] = useState<HTMLDivElement | null>(null);

  return (
    <PageContentLayout
      title={t('repoPages.title')}
      entityTitle={
        repo ? (
          <EntityPreviewTitle
            title={repo.nameWithOwner ?? 'Repository'}
            link={repo.url}
            variant="repository"
          />
        ) : (
          <SkeletonBox height={24} />
        )
      }
      navigation={<RepoNavigation />}
      footerLeft={<div ref={setFooterLeftContainer} style={{ display: 'contents' }} />}
      footerRight={<div ref={setFooterRightContainer} style={{ display: 'contents' }} />}
    >
      <div className={classes['repo-layout-content']}>
        <RepoLayoutFooterContext.Provider
          value={{
            footerLeftContainer,
            footerRightContainer,
          }}
        >
          <Outlet />
        </RepoLayoutFooterContext.Provider>
      </div>
    </PageContentLayout>
  );
};
