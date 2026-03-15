import type { DraftIssue, Issue, PullRequest } from '@octokit/graphql-schema';

import { Fragment } from '../../../widget-components';
import { isValidHexColor } from '../../lib/color-utils';
import { formatDate } from '../../lib/helpers';
import { useWidgetTranslation } from '../../lib/hooks';
import { presetColors } from '../../styles';
import { Avatar } from '../avatar';
import { Button } from '../buttons';
import { CustomText } from '../custom-text';
import { IssueContentSection } from '../issue-content';
import { EntityField } from '../issue-field';

export type EntityMetadataSectionProps = {
  entity: Issue | DraftIssue | PullRequest;
} & AutoLayoutProps;

export const EntityMetadataSection = ({
  entity,
  children,
  ...rest
}: EntityMetadataSectionProps) => {
  const { t, locale } = useWidgetTranslation();
  const { assignees } = entity;

  const fixColor = (color: string) => {
    if (isValidHexColor(color)) {
      return color;
    }
    return `#${color}`;
  };

  const projectFieldName =
    entity.__typename === 'Issue' || entity.__typename === 'PullRequest'
      ? entity?.projectItems?.nodes?.[0]?.fieldValueByName?.field.name
      : undefined;

  return (
    <IssueContentSection headerText={'Метаданные'} {...rest}>
      <EntityField
        hidden={!assignees?.nodes?.length}
        field={{ title: t('entityMetadata.assignee.fieldTitle') }}
        right={{
          children: assignees?.nodes?.map((assignee) => (
            <Avatar
              key={`entity-metadata-section-assignee-${assignee?.login}`}
              size="extra-small"
              textIsHidden={Boolean(assignees?.nodes && assignees?.nodes?.length > 1)}
              text={assignee?.login ?? assignee?.name ?? undefined}
              avatarUrl={assignee?.avatarUrl}
            />
          )),
        }}
      />
      {(entity.__typename === 'Issue' || entity.__typename === 'PullRequest') && (
        <Fragment>
          <EntityField
            field={{
              title: t('entityMetadata.projectField.fieldTitle', { title: projectFieldName ?? '' }),
            }}
            emptyText={!projectFieldName ? t('entityMetadata.projectField.emptyText') : undefined}
            right={
              projectFieldName
                ? {
                    children: entity?.projectItems?.nodes?.map(
                      (projectItem, index) =>
                        projectItem?.fieldValueByName?.__typename ===
                          'ProjectV2ItemFieldSingleSelectValue' && (
                          <Button
                            tooltip={projectItem?.fieldValueByName?.description}
                            fill={presetColors[projectItem?.fieldValueByName?.color]}
                            key={`entity-metadata-section-project-${projectItem?.fieldValueByName.name ?? index}`}
                            text={projectItem?.fieldValueByName?.name}
                            appearance="none"
                            size="extra-small"
                          />
                        )
                    ),
                  }
                : undefined
            }
          />
          <EntityField
            name="Labels"
            field={{ title: t('entityMetadata.labels.fieldTitle') }}
            emptyText={
              !entity?.labels?.nodes?.length ? t('entityMetadata.labels.emptyText') : undefined
            }
            right={
              entity?.labels?.nodes?.length
                ? {
                    children: entity.labels?.nodes.map((label) => {
                      const fixedBackgroundColor = fixColor(label.color);

                      return (
                        <Button
                          key={`entity-metadata-section-label-${label.name}`}
                          text={label.name}
                          tooltip={label?.description}
                          fill={fixedBackgroundColor}
                          appearance="none"
                          size="extra-small"
                        />
                      );
                    }),
                  }
                : undefined
            }
          />
        </Fragment>
      )}
      {children}
      <EntityField
        field={{ title: t('ui.updatedAt') }}
        withBorder={false}
        right={{
          children: (
            <CustomText size="extra-small">
              {formatDate({ value: entity.updatedAt, locale })}
            </CustomText>
          ),
        }}
      />
    </IssueContentSection>
  );
};
