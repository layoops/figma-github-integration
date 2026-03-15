import type { ProjectV2 } from '@octokit/graphql-schema';

import { useMemo, useState } from 'react';
import { Button, RelativeTime, Text } from '@primer/react';

import { useTranslation } from '@/shared/lib/contexts';
import { EmptyTableRow, EntityCell, EntityTable } from '@/shared/ui';

import classes from './projects-table.module.css';

const pageSize = 10;

type FilterState = 'open' | 'closed';

type ProjectsTableProps = {
  projects?: (ProjectV2 | null | undefined)[];
};

export const ProjectsTable = ({ projects }: ProjectsTableProps) => {
  const { t, locale } = useTranslation();

  const [pageIndex, setPageIndex] = useState(0);

  const [filter, setFilter] = useState<FilterState>('open');

  const counts = useMemo(() => {
    const open = projects?.filter((i) => !i?.closed).length;
    const closed = projects?.filter((i) => i?.closed).length;
    return { open, closed };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return filter === 'open'
      ? projects?.filter((i) => !i?.closed)
      : projects?.filter((i) => i?.closed);
  }, [filter, projects]);

  const currentData = useMemo(() => {
    const start = pageIndex * pageSize;
    return filteredProjects?.slice(start, start + pageSize);
  }, [filteredProjects, pageIndex]);

  const handleFilterChange = (newFilter: FilterState) => {
    setFilter(newFilter);
    setPageIndex(0);
  };

  const mainHeaderContent = useMemo(
    () => (
      <div className={classes.pullRequestHeader}>
        <div className={classes.pullRequestHeaderFilters}>
          <Button
            size="small"
            variant="invisible"
            onClick={() => handleFilterChange('open')}
            count={counts.open}
            style={{ marginLeft: 'auto' }}
          >
            <Text size="small" weight={filter === 'open' ? 'semibold' : 'normal'}>
              {t('entity.project.table.header.filters.opened.title')}
            </Text>
          </Button>

          <Button
            size="small"
            variant="invisible"
            onClick={() => handleFilterChange('closed')}
            count={counts.closed}
          >
            <Text size="small" weight={filter === 'closed' ? 'semibold' : 'normal'}>
              {t('entity.project.table.header.filters.closed.title')}
            </Text>
          </Button>
        </div>
      </div>
    ),
    [filter, counts]
  );

  const renderProjectsRequestRow = (project: ProjectV2) => (
    <EntityCell
      title={project.title}
      link={{ to: '/project/$id', params: { id: project.id } }}
      bottomContent={
        <Text size="small">
          #{project.number} {t('entity.project.table.entityRow.updatedText')}{' '}
          {project.createdAt && <RelativeTime lang={locale} date={new Date(project.createdAt)} />}
        </Text>
      }
    />
  );

  return (
    <EntityTable<ProjectV2>
      title={t('entity.project.table.title')}
      data={!currentData || currentData?.length === 0 ? [{} as any] : currentData}
      totalCount={filteredProjects?.length}
      pageSize={pageSize}
      currentPageIndex={pageIndex}
      onPageChange={setPageIndex}
      renderRow={(row) =>
        currentData && currentData.length === 0 ? (
          <EmptyTableRow
            title={t(
              filter === 'closed'
                ? 'entity.project.table.emptyState.noClosedItems'
                : 'entity.project.table.emptyState.noOpenItems'
            )}
          />
        ) : (
          renderProjectsRequestRow(row)
        )
      }
      mainHeaderContent={mainHeaderContent}
    />
  );
};
