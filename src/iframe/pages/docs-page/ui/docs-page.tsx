import { Text } from '@primer/react';

import { useTranslation } from '@/shared/lib/contexts';
import { PageContentLayout } from '@/widgets/page-content-layout';

import classes from './docs-page.module.css';

const SECTION_KEYS = [
  'gettingStarted',
  'import',
  'projects',
  'createIssue',
  'search',
  'settings',
  'widget',
] as const;

export const DocsPage = () => {
  const { t } = useTranslation();

  return (
    <PageContentLayout title={t('documentationPage.title')}>
      <div className={classes['docs-content']}>
        <Text as="p" size="small" className={classes['docs-intro']}>
          {t('documentationPage.intro')}
        </Text>

        <div className={classes['docs-sections']}>
          {SECTION_KEYS.map((key) => (
            <details key={key} className={classes['docs-section']}>
              <summary className={classes['docs-section-summary']}>
                <Text size="small" weight="semibold">
                  {t(`documentationPage.sections.${key}.title`)}
                </Text>
              </summary>
              <Text as="p" size="small" className={classes['docs-section-body']}>
                {t(`documentationPage.sections.${key}.body`)}
              </Text>
            </details>
          ))}
        </div>
      </div>
    </PageContentLayout>
  );
};
