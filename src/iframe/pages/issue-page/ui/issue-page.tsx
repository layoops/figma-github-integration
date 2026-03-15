import { Button } from '@primer/react';
import { getRouteApi } from '@tanstack/react-router';

import { IssuePreview } from '@/entities/issue';
import { useImportIssueToFigma } from '@/features/import';
import { useTranslation } from '@/shared/lib/contexts';
import { PageContentLayout } from '@/widgets/page-content-layout';

const routeApi = getRouteApi('/_layout/_protected/issue/$id');

export const IssuePage = () => {
  const { t } = useTranslation();

  const issue = routeApi.useLoaderData({ select: (data) => data.node });

  const { importEntity, isImporting } = useImportIssueToFigma();

  const handleImportClick = () => {
    issue?.id && importEntity(issue.id);
  };

  return (
    <PageContentLayout
      title={t('issuePage.title')}
      footerRight={
        <Button
          variant="primary"
          disabled={!issue}
          loading={isImporting}
          onClick={handleImportClick}
        >
          {t('issuePage.actionImport.label')}
        </Button>
      }
    >
      {issue && <IssuePreview issue={issue} />}
    </PageContentLayout>
  );
};
