import type { CommonSizes } from '../../styles';
import type { WidgetTheme } from '../../styles/themes';

import { AutoLayout, Text, useSyncedState } from '../../../widget-components';
import { SYNC_KEYS } from '../../lib/sync-keys';
import { getColorStyles, TextStyles } from '../../styles';

export type ValidationStatus = 'default' | 'warning' | 'error';

export type ValidationContent = {
  text?: string;
  status: ValidationStatus;
};

export type ValidationProps = {
  validation?: ValidationContent;
  size: CommonSizes;
};

export const Validation = (props: ValidationProps) => {
  const { validation = { status: 'default' }, size } = props;
  const [widgetTheme] = useSyncedState<WidgetTheme>(SYNC_KEYS.widget.theme, 'light');
  const colorStyles = getColorStyles(widgetTheme);

  const textColor =
    validation.status === 'error'
      ? colorStyles.validation.error.text
      : validation.status === 'warning'
        ? colorStyles.validation.warning.text
        : colorStyles.fg.default;

  return (
    <AutoLayout hidden={Boolean(validation?.status === 'default')} width="hug-contents">
      <Text fill={textColor} fontSize={TextStyles[size].size}>
        Validation
      </Text>
    </AutoLayout>
  );
};
