import type { ProjectContentCounts } from '../project-content';

import { useWidgetTranslation } from '../../../../shared/lib/hooks';
import { Badge, CustomText, EntityField, IssueContentBlock } from '../../../../shared/ui';
import { AutoLayout } from '../../../../widget-components';

type ProjectOverviewContentProps = {
  contentCount?: ProjectContentCounts;
} & AutoLayoutProps;

function splitCamelCase(str: string): string {
  const result = str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

const ProjectOverviewField = ({ leftText, rightText }: { leftText: string; rightText: string }) => {
  return (
    <EntityField
      left={{
        children: (
          <AutoLayout padding={{ top: 4 }} width="fill-parent">
            <CustomText fontWeight="semi-bold" size="extra-small">
              {leftText}
            </CustomText>
          </AutoLayout>
        ),
      }}
      right={{
        children: <Badge width="hug-contents" text={rightText} />,
        props: { width: 'hug-contents' },
      }}
    />
  );
};

export const ProjectOverviewSection = ({ contentCount, ...rest }: ProjectOverviewContentProps) => {
  const { t } = useWidgetTranslation();
  const { totalContent, typeCounts, completedTasks } = contentCount ?? {};

  return (
    <IssueContentBlock {...rest}>
      <ProjectOverviewField leftText={t('widget.taskProgress')} rightText={String(totalContent)} />
      {Object.entries(typeCounts).map(([type, count]) => (
        <ProjectOverviewField
          key={`project-overflow-field-${type}`}
          leftText={splitCamelCase(type)}
          rightText={String(count)}
        />
      ))}
      <ProjectOverviewField
        leftText={t('widget.completedIssues')}
        rightText={String(completedTasks)}
      />
    </IssueContentBlock>
  );
};
