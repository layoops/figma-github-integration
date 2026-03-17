import { Button } from '@primer/react';
import { useRouter } from '@tanstack/react-router';

import { IssueCreateForm } from '@/entities/issue';
import { useCreateIssueForm } from '@/features/create';
import { useAppContext, useTranslation } from '@/shared/lib/contexts';
import { PageContentLayout } from '@/widgets/page-content-layout';

import { Route } from '../../../app/routing/_layout/_protected/issue/create';

export const IssueCreatePage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { target } = Route.useSearch();
  const { applicationSettings } = useAppContext();

  const defaultTarget = target ?? applicationSettings?.defaultTargetUrl ?? '';

  const form = useCreateIssueForm({ defaultTarget });

  return (
    <form.AppForm>
      <PageContentLayout
        title={t('issueCreatePage.title')}
        footerRight={
          <>
            <Button onClick={() => router.history.back()} disabled={form.state.isSubmitting}>
              {t('issueCreatePage.actionCancel.label')}
            </Button>
            <Button
              variant="primary"
              onClick={form.handleSubmit}
              disabled={form.state.isSubmitting}
              loading={form.state.isSubmitting}
            >
              {t('issueCreatePage.actionCreate.label')}
            </Button>
          </>
        }
      >
        <IssueCreateForm />
      </PageContentLayout>
    </form.AppForm>
  );
};
