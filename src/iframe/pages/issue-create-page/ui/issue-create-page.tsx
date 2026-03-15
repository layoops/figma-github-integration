import { useState } from 'react';
import { Button } from '@primer/react';
import { useRouter } from '@tanstack/react-router';

import { IssueCreateForm } from '@/entities/issue';
import { useCreateIssueForm } from '@/features/create';
import { useTranslation } from '@/shared/lib/contexts';
import { CheckboxField } from '@/shared/ui';
import { PageContentLayout } from '@/widgets/page-content-layout';

export const IssueCreatePage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [importIssue, setImportIssue] = useState(true);

  const form = useCreateIssueForm({ importIssue });

  return (
    <form.AppForm>
      <PageContentLayout
        title={t('issueCreatePage.title')}
        footerLeft={
          <CheckboxField
            checked={importIssue}
            onChange={setImportIssue}
            label={t('issueCreatePage.actionImportIssue.label')}
            disabled={form.state.isSubmitting}
          />
        }
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
