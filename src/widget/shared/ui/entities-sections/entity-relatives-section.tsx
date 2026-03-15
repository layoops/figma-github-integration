import type {
  IssueTimelineItems,
  Milestone,
  ProjectV2Item,
  PullRequestTimelineItems,
} from '@octokit/graphql-schema';

import { AutoLayout } from '../../../widget-components';
import { formatDate } from '../../lib/helpers';
import { useOpenEntityPluginUI, useWidgetTranslation } from '../../lib/hooks';
import { Button } from '../buttons';
import { CustomText } from '../custom-text';
import { EntityStateLabel } from '../entity-state-label';
import { IssueContentBlock, IssueContentSection } from '../issue-content';
import { EntityField } from '../issue-field';

export type EntityRelativesSectionProps = {
  content: {
    timelineItems?: PullRequestTimelineItems[] | IssueTimelineItems[];
    projectItems?: ProjectV2Item[];
    milestone?: Milestone;
  };
} & AutoLayoutProps;

export const EntityRelativesSection = ({
  content,
  hidden,
  ...rest
}: EntityRelativesSectionProps) => {
  const { t, locale } = useWidgetTranslation();

  const openEntityPluginUI = useOpenEntityPluginUI();

  const hasLinkedEntity = Boolean(content?.timelineItems?.length > 0);
  const hasLinkedProject = Boolean(content?.projectItems?.length > 0);
  const hasLinkedMilestone = Boolean(content.milestone);

  return (
    <AutoLayout hidden={hidden} width="fill-parent" direction="vertical">
      <IssueContentSection direction="vertical" {...rest}>
        <EntityField
          field={{ title: t('entityMetadata.development.fieldTitle') }}
          emptyText={!hasLinkedEntity ? t('entityMetadata.development.emptyText') : undefined}
          right={
            hasLinkedEntity
              ? {
                  props: { direction: 'vertical' },
                  children: (
                    <IssueContentBlock
                      cornerRadius={0}
                      padding={0}
                      spacing={0}
                      wrap={false}
                      direction="vertical"
                    >
                      {content?.timelineItems?.map(
                        (item: IssueTimelineItems | PullRequestTimelineItems, index) => {
                          return (
                            item.__typename === 'ConnectedEvent' && (
                              <Button
                                textAlign="left"
                                key={`entity-relatives-section-linked-issue-${item.subject.title ?? index}`}
                                appearance="ghost"
                                width="fill-parent"
                                horizontalAlignItems="start"
                                minHeight={34}
                                leftChildren={
                                  <EntityStateLabel
                                    target={
                                      item.subject.__typename === 'Issue' ? 'issue' : 'pullRequest'
                                    }
                                    iconOnly={true}
                                    state={item.subject.state ?? 'DRAFT'}
                                  />
                                }
                                onClick={() => {
                                  openEntityPluginUI({
                                    id: item.subject.id,
                                    __typename: item.subject.__typename,
                                  });
                                }}
                                size="extra-small"
                                text={item.subject.title}
                              />
                            )
                          );
                        }
                      )}
                    </IssueContentBlock>
                  ),
                }
              : undefined
          }
        />
        <EntityField
          field={{ title: t('entityMetadata.projects.fieldTitle') }}
          emptyText={!hasLinkedProject ? t('entityMetadata.projects.emptyText') : undefined}
          right={
            hasLinkedProject
              ? {
                  props: { direction: 'vertical' },
                  children: (
                    <IssueContentBlock cornerRadius={0} padding={0} wrap direction="horizontal">
                      {content?.projectItems?.map((projectItem, index) => (
                        <Button
                          textAlign="left"
                          key={`entity-relatives-section-linked-project-${projectItem.project.title ?? index}`}
                          appearance="ghost"
                          width="fill-parent"
                          horizontalAlignItems="start"
                          minHeight={34}
                          size="extra-small"
                          onClick={() => {
                            openEntityPluginUI({
                              id: projectItem.project.id,
                              __typename: projectItem.project.__typename,
                            });
                          }}
                          text={projectItem.project.title}
                        />
                      ))}
                    </IssueContentBlock>
                  ),
                }
              : undefined
          }
        />
        <EntityField
          field={{ title: t('entityMetadata.milestone.fieldTitle') }}
          emptyText={!hasLinkedMilestone ? t('entityMetadata.milestone.emptyText') : undefined}
          right={
            hasLinkedMilestone
              ? {
                  children: (
                    <IssueContentBlock cornerRadius={0} padding={0} wrap direction="horizontal">
                      <AutoLayout spacing={8} width="fill-parent">
                        <CustomText
                          href={content.milestone.url}
                          width="fill-parent"
                          size="extra-small"
                        >
                          {content?.milestone.title}
                        </CustomText>
                        {content.milestone.dueOn ? (
                          <CustomText size="extra-small" width="hug-contents">
                            {formatDate({ value: content.milestone.dueOn, locale })}
                          </CustomText>
                        ) : undefined}
                      </AutoLayout>
                    </IssueContentBlock>
                  ),
                }
              : undefined
          }
        />
      </IssueContentSection>
    </AutoLayout>
  );
};
