import type { DraftIssue, Issue } from '@octokit/graphql-schema';

import { IssueContent } from '../entities/issue/ui/issue-content';
import { useAppendChild } from '../shared/lib/hooks/use-append-child';
import { ColorStyles } from '../shared/styles';
import { IssueHeader, IssueStateLabel } from '../shared/ui/components';
import { IssueHeaderTitle } from '../shared/ui/components/issue-header-title/issue-header-title';
import { AutoLayout, Line, useSyncedState } from '../widget-components';
import { IssueContentPreview } from '../widgets/content-preview';
import { Footer } from '../widgets/layout/footer';

export const IssueWidget = () => {
  const [githubIssue] = useSyncedState<Issue | DraftIssue | null>('githubIssue', null);

  const { __typename, id, title } = githubIssue;

  const [openedMore, setOpenedMore] = useSyncedState<boolean>('openedMoreIssue', false);

  const { openMore } = useAppendChild({ setOpenedMore });

  const linkText =
    githubIssue.__typename === 'Issue'
      ? `${githubIssue.repository.owner.login}/${githubIssue.repository.name}#${githubIssue.number}`
      : undefined;

  return (
    <AutoLayout
      verticalAlignItems={'center'}
      horizontalAlignItems={'center'}
      direction="vertical"
      width={'fill-parent'}
    >
      {title ? (
        <IssueHeader
          title={
            <IssueHeaderTitle
              href={githubIssue.__typename === 'Issue' ? githubIssue?.url : ''}
              preLinkChildren={
                <IssueStateLabel
                  type={'Issue'}
                  iconOnly={linkText ? true : false}
                  state={__typename === 'Issue' ? githubIssue.state : 'DRAFT'}
                />
              }
              text={linkText}
            />
          }
          contentPreview={
            <IssueContentPreview
              githubEntity={{
                entityType: 'issue',
                entity: { id: id, title: title },
              }}
              openedMore={openedMore}
              issue={githubIssue}
            />
          }
          onClick={openMore}
          openedMore={openedMore}
        />
      ) : null}
      <IssueContent issue={githubIssue} hidden={!openedMore} />
      <Line
        hidden={!openedMore}
        stroke={ColorStyles.border}
        strokeWidth={1}
        length={'fill-parent'}
      />
      <Footer
        githubEntity={{
          entityType: 'issue',
          entity: { id: id, title: title },
        }}
        hidden={!openedMore}
      />
    </AutoLayout>
  );
};
