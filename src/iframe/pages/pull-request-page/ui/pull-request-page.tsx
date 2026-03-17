import { Button } from '@primer/react';
import { getRouteApi } from '@tanstack/react-router';

import { PullRequestPreview } from '@/entities/pull-request';
import { useImportPullRequestToFigma } from '@/features/import';
import { useTranslation } from '@/shared/lib/contexts';
import { PageContentLayout } from '@/widgets/page-content-layout';

const routeApi = getRouteApi('/_layout/_protected/pull-request/$id');

export const PullRequestPage = () => {
  const { t } = useTranslation();

  const pullRequest = routeApi.useLoaderData({ select: (data) => data.node });

  const { importEntity, isImporting } = useImportPullRequestToFigma();

  const handleImportClick = () => {
    pullRequest?.id && importEntity(pullRequest.id);
  };

  return (
    <PageContentLayout
      title={t('pullRequestPage.title')}
      footerRight={
        <Button
          variant="primary"
          disabled={!pullRequest}
          loading={isImporting}
          onClick={handleImportClick}
        >
          {t('pullRequestPage.actionImport.label')}
        </Button>
      }
    >
      {pullRequest && <PullRequestPreview pullRequest={pullRequest} />}
    </PageContentLayout>
  );
};
