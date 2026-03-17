import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { CreateIssueSearchForm, SelectTypeForm } from '@/features/create';
import { useAppContext } from '@/shared/lib/contexts';
import { Button, ButtonGroup, PageLayout, WarningBlock } from '@/shared/ui/components';

import classes from './create-page.module.css';

export const CreatePage = () => {
  const [createType, setCreateType] = useState<'search' | 'create'>('search');
  const { githubEntity, githubAccessToken } = useAppContext();

  useEffect(() => {
    setCreateType('search');
  }, []);

  useEffect(() => {
    githubEntity && setCreateType('create');
  }, [githubEntity]);

  const onClickCreate = () => {
    createType === 'create' ? setCreateType('search') : setCreateType('create');
  };

  return (
    <PageLayout>
      {!githubAccessToken && <WarningBlock />}
      {githubAccessToken && (
        <div className={classes['create-page-content']}>
          <div className={classes['create-issue-page-navigation']}>
            <ButtonGroup>
              <Button
                onClick={() => setCreateType('search')}
                isActive={createType === 'search'}
                size="medium"
                appearance="secondary"
              >
                Search
              </Button>

              <Button
                disabled={
                  githubEntity?.entityType !== 'project' &&
                  githubEntity?.entityType !== 'repository'
                }
                isActive={createType === 'create'}
                onClick={onClickCreate}
                size="medium"
                appearance="secondary"
              >
                Creation
              </Button>
            </ButtonGroup>
          </div>
          <SelectTypeForm className={clsx({ hidden: createType !== 'search' })} />
          <CreateIssueSearchForm className={clsx({ hidden: createType !== 'create' })} />
        </div>
      )}
    </PageLayout>
  );
};
