import type { IssueCommentConnection } from '@octokit/graphql-schema';

import { formatDate } from '../../../../shared/lib/helpers';
import { Colors } from '../../../../shared/styles';
import { IssueBodyHeader, IssueContentBody } from '../../../../shared/ui/components';
import { IconExternal } from '../../../../shared/ui/icons';
import { Fragment } from '../../../../widget-components';
import { IssueBodySection } from './issue-body-section';

interface IssueCommentsSectionProps extends AutoLayoutProps {
  issueUrl: string;
  comments: IssueCommentConnection;
}

export const IssueCommentsSection = ({
  comments,
  hidden,
  issueUrl,
  ...rest
}: IssueCommentsSectionProps) => {
  return (
    <Fragment>
      <IssueContentBody hidden={hidden} {...rest}>
        <IssueBodyHeader
          left={{
            name: `Last ${comments?.nodes?.length} comments`,
          }}
          right={{
            text: { text: 'More Comments', url: issueUrl },
          }}
        />
      </IssueContentBody>
      {comments?.nodes?.map((comment) => (
        <IssueBodySection
          id={comment.id}
          type="comment"
          key={comment.id}
          hidden={!comment?.bodyText || hidden}
          content={comment?.bodyText}
          header={{
            left: {
              text: comment.author?.login,
              avatarUrl: comment.author?.avatarUrl,
            },
            right: {
              text: formatDate({ value: comment?.updatedAt }),
              icon: {
                url: comment.url,
                src: IconExternal(Colors.black),
              },
            },
          }}
        />
      ))}
    </Fragment>
  );
};
