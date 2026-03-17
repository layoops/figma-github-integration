import type { WidgetTheme } from '../../styles/themes';

import { AutoLayout, Line, useSyncedState } from '../../../widget-components';
import { SYNC_KEYS } from '../../lib/sync-keys';
import { getColorStyles } from '../../styles';
import { CustomText } from '../custom-text';

export type EntityFieldProps = {
  emptyText?: string;
  field?: {
    icon?: FigmaDeclarativeNode;
    title: string;
  };
  left?: {
    children?: FigmaDeclarativeNode;
  };
  right?: {
    children?: FigmaDeclarativeNode;
    props?: AutoLayoutProps;
  };
  withBorder?: boolean;
} & Omit<AutoLayoutProps, 'children'>;

export const EntityField = ({
  field,
  left,
  right,
  emptyText,
  withBorder = true,
  ...rest
}: EntityFieldProps) => {
  const [widgetTheme] = useSyncedState<WidgetTheme>(SYNC_KEYS.widget.theme, 'light');
  const colorStyles = getColorStyles(widgetTheme);

  return (
    <AutoLayout
      name="Issue Field"
      minHeight={28}
      spacing={8}
      width="fill-parent"
      height="hug-contents"
      direction="vertical"
      {...rest}
    >
      {left?.children ?? (
        <AutoLayout
          direction="horizontal"
          spacing={8}
          width="fill-parent"
          verticalAlignItems="center"
        >
          {field?.icon}
          <CustomText fill={colorStyles.fg.muted} size="extra-small" fontWeight="bold">
            {field.title}
          </CustomText>
        </AutoLayout>
      )}
      {!emptyText && right?.children && (
        <AutoLayout
          minHeight={24}
          verticalAlignItems="center"
          width="fill-parent"
          direction="horizontal"
          wrap={right?.props?.direction !== 'vertical'}
          spacing={8}
          {...right?.props}
        >
          {right?.children}
        </AutoLayout>
      )}
      {emptyText ? (
        <CustomText fill={colorStyles.fg.muted} size="extra-small">
          {emptyText}
        </CustomText>
      ) : null}
      {withBorder && <Line stroke={colorStyles.border} strokeWidth={1} length="fill-parent" />}
    </AutoLayout>
  );
};
