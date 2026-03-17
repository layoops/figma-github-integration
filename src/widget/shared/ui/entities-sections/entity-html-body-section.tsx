import type { WidgetTheme } from '../../styles/themes';

import { AutoLayout, useSyncedState } from '../../../widget-components';
import { SYNC_KEYS } from '../../lib/sync-keys';
import { getColorStyles } from '../../styles';
import { IconButton } from '../buttons';
import { CustomText } from '../custom-text';
import { EntityBodyHeader, IssueContentSection } from '../issue-content';
import { EmptyEntitySectionBlock } from './empty-entity-section-block';

const BODY_MAX_LINES = 10;

export type EntityBodySectionProps = {
  header: {
    left: {
      title?: string;
      avatarUrl?: string;
    };
    right?: {
      text?: string;
      icon?: { src?: string; url?: string };
    };
  };
  expanded?: boolean;
  body?: string;
  type: 'description' | 'comment';
  id: string;
} & AutoLayoutProps;

export const EntityHTMLBodySection = ({
  body: body,
  header,
  type = 'description',
  key,
  hidden,
  ...rest
}: EntityBodySectionProps) => {
  const [widgetTheme] = useSyncedState<WidgetTheme>(SYNC_KEYS.widget.theme, 'light');
  const colorStyles = getColorStyles(widgetTheme);

  const [expanded, setExpanded] = useSyncedState(
    SYNC_KEYS.shared.ui.entityHTMLBodySection.expanded(type, key),
    false
  );

  const handleMoreButtonClick = () => {
    setExpanded((prev) => !prev);
  };

  const hasContent = Boolean(body);

  return (
    <AutoLayout
      stroke={colorStyles.border}
      cornerRadius={12}
      hidden={hidden}
      width="fill-parent"
      direction="vertical"
    >
      {hasContent && (
        <IssueContentSection spacing={0} {...rest}>
          <EntityBodyHeader
            hidden={!header}
            left={{
              title: header.left.title,
              avatarUrl: header.left.avatarUrl,
            }}
            right={{
              text: { text: header.right?.text },
              icon: {
                src: header.right?.icon?.src,
                url: header.right?.icon?.url,
              },
              children: (
                <IconButton
                  onClick={handleMoreButtonClick}
                  icon="chevron"
                  appearance="secondary"
                  size="extra-small"
                  iconRotation={expanded ? 180 : 0}
                />
              ),
            }}
          />
          <AutoLayout width="fill-parent" padding={8}>
            <CustomText
              size="extra-small"
              width="fill-parent"
              truncate={expanded ? undefined : BODY_MAX_LINES}
              fill={colorStyles.fg.default}
            >
              {body}
            </CustomText>
          </AutoLayout>
        </IssueContentSection>
      )}
      {!hasContent && (
        <AutoLayout padding={8}>
          <EmptyEntitySectionBlock widgetTheme={widgetTheme}>
            No description provided
          </EmptyEntitySectionBlock>
        </AutoLayout>
      )}
    </AutoLayout>
  );
};
