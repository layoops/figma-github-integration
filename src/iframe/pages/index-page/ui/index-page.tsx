import { Button, Heading } from '@primer/react';
import { Link } from '@tanstack/react-router';

import { SearchEntityForm } from '@/features/search';
import { ROUTES, ROUTES_MAP } from '@/global-shared/routes-map';
import { useAppContext, useTranslation } from '@/shared/lib/contexts';
import { Loader } from '@/shared/ui';
import { PageContentLayout } from '@/widgets/page-content-layout';

import classes from './index-page.module.css';

export const IndexPage = () => {
  const { isLoading } = useAppContext();
  const { t } = useTranslation();

  return (
    <PageContentLayout>
      {isLoading ? (
        <Loader textVariant="none" />
      ) : (
        <div className={classes['page-content']}>
          <Heading variant="large">Figma GitHub Integration</Heading>
          <SearchEntityForm>
            <Button as={Link} to={ROUTES_MAP[ROUTES.ISSUE_CREATE]} variant="primary">
              {t('links.newIssue.title')}
            </Button>
          </SearchEntityForm>
        </div>
      )}
    </PageContentLayout>
  );
};
