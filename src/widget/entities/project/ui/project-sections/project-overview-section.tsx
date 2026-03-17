import type { CountContentTypesResult } from '../project-content';

import { Badge, CustomText, IssueContentBody, IssueField } from '../../../../shared/ui/components';
import { AutoLayout } from '../../../../widget-components';

interface ProjectOverviewContentProps extends AutoLayoutProps {
  contentCount?: CountContentTypesResult;
}

function splitCamelCase(str: string): string {
  const result = str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

const ProjectOverviewField = ({ leftText, rightText }: { leftText: string; rightText: string }) => {
  return (
    <IssueField
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
  const { totalContent, typeCounts, completedTasks } = contentCount ?? {};
  return (
    <IssueContentBody {...rest}>
      <ProjectOverviewField leftText="Task progress" rightText={String(totalContent)} />
      {Object.entries(typeCounts).map(([type, count]) => (
        <ProjectOverviewField
          key={type}
          leftText={splitCamelCase(type)}
          rightText={String(count)}
        />
      ))}
      <ProjectOverviewField leftText="Completed Issues" rightText={String(completedTasks)} />
    </IssueContentBody>
  );
};
