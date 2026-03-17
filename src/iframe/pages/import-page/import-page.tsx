import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { useAppContext } from '@/shared/lib/contexts';
import { querySearchExamplesLink } from '@/shared/lib/links';
import { Button, ButtonGroup, PageLayout, WarningBlock } from '@/shared/ui/components';
import { ImportIssueContent, ImportProjectContent } from '@/widgets/import-content';

import classes from './import-issue.module.css';

export const ImportPage = () => {
  const [searchType, setSearchType] = useState<'search' | 'query-search' | 'project'>('search');
  const { githubEntity, setGithubEntity, githubAccessToken, propsFromWidget } = useAppContext();

  useEffect(() => {
    propsFromWidget.githubEntity && setGithubEntity(propsFromWidget.githubEntity);
  }, [propsFromWidget.githubEntity]);

  useEffect(() => {
    githubEntity?.entityType === 'project' && setSearchType('project');
  }, [githubEntity]);

  const onClickProject = () => {
    searchType === 'project' ? setSearchType('search') : setSearchType('project');
  };
  const openExamples = () => {
    window.open(querySearchExamplesLink, '_blank');
  };

  return (
    <PageLayout>
      {!githubAccessToken && <WarningBlock />}
      {githubAccessToken && (
        <div className={classes['import-page-content']}>
          <div className={classes['import-page-navigation']}>
            <ButtonGroup>
              <Button
                onClick={() => setSearchType('search')}
                isActive={searchType === 'search'}
                size="medium"
                appearance="secondary"
              >
                Search by URL
              </Button>
              <Button
                onClick={() => setSearchType('query-search')}
                isActive={searchType === 'query-search'}
                size="medium"
                appearance="secondary"
              >
                Search by Query
              </Button>
            </ButtonGroup>
            {githubEntity?.entityType === 'project' && searchType !== 'query-search' && (
              <Button onClick={onClickProject} appearance={'ghost'} size="small">
                {searchType === 'project' ? 'Back to search' : 'Back to project'}
              </Button>
            )}
            {searchType === 'query-search' && (
              <Button onClick={openExamples} appearance={'ghost'} size="medium">
                Examples
              </Button>
            )}
          </div>
          <ImportIssueContent
            className={clsx({ hidden: searchType === 'project' })}
            searchType={searchType}
          />

          <ImportProjectContent
            className={clsx({
              hidden: searchType !== 'project' || githubEntity?.entityType !== 'project',
            })}
          />
        </div>
      )}
    </PageLayout>
  );
};
