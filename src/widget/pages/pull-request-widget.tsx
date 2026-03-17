import type { PullRequest } from '@octokit/graphql-schema';

import { PullRequestContent } from '../entities/pull-request/ui/pull-request-content';
import { useAppendChild } from '../shared/lib/hooks/use-append-child';
import { ColorStyles } from '../shared/styles';
import { CustomText, IssueHeader } from '../shared/ui/components';
import { IssueHeaderTitle } from '../shared/ui/components/issue-header-title/issue-header-title';
import { IssueStateLabel } from '../shared/ui/components/issue-state-label/issue-state-label';
import { AutoLayout, Line, useSyncedState } from '../widget-components';
import { Footer } from '../widgets/layout/footer';
type PullRequestWidgetProps = {
  pullRequest?: PullRequest;
};
export const PullRequestWidget = (props: PullRequestWidgetProps) => {
  const [pullRequest] = useSyncedState<PullRequest | null>(
    'pullRequest',
    () => props.pullRequest ?? null
  );

  const { id, title } = pullRequest;

  const [openedMore, setOpenedMore] = useSyncedState<boolean>('openedMore', false);

  const { openMore } = useAppendChild({ setOpenedMore });

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
              href={pullRequest?.url}
              preLinkChildren={
                <IssueStateLabel type={'PullRequest'} state={pullRequest.state ?? 'DRAFT'} />
              }
              text={`${pullRequest.repository.owner.login}/${pullRequest.repository.name}#${pullRequest.number}`}
            />
          }
          contentPreview={
            <AutoLayout
              direction="vertical"
              verticalAlignItems={'center'}
              spacing={12}
              width="fill-parent"
            >
              <CustomText width={'hug-contents'} size="medium">
                {title}
              </CustomText>
            </AutoLayout>
          }
          onClick={openMore}
          openedMore={openedMore}
          disabled={!pullRequest.bodyText}
        />
      ) : null}

      <PullRequestContent pullRequest={pullRequest} hidden={!openedMore} />

      <Line
        hidden={!openedMore}
        stroke={ColorStyles.border}
        strokeWidth={1}
        length={'fill-parent'}
      />
      <Footer
        githubEntity={{
          entityType: 'pull-request',
          entity: { id: id, title: title },
        }}
        hidden={!openedMore}
      />
    </AutoLayout>
  );
};
