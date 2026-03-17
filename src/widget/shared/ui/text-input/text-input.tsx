import type { CommonSizes } from '../../styles/common';
import type { WidgetTheme } from '../../styles/themes';
import type { ValidationContent } from '../validation';

import { AutoLayout, Input, SVG, useSyncedState } from '../../../widget-components';
import { SYNC_KEYS } from '../../lib/sync-keys';
import { getColorStyles, TextStyles } from '../../styles';
import { commonSizings } from '../../styles/common';
import { IconLink } from '../icons';
import { Validation } from '../validation';

export type TextInputProps = {
  hasIconLeft?: boolean;
  size?: CommonSizes;
  validation?: ValidationContent;
} & InputProps;

export const TextInput = (props: TextInputProps) => {
  const {
    placeholder = 'Placeholder',
    inputBehavior = 'wrap',
    onTextEditEnd,
    size = 'medium',
    value,
    validation = { text: 'error', status: 'default' },
    hasIconLeft = false,
    ...rest
  } = props;

  const [widgetTheme] = useSyncedState<WidgetTheme>(SYNC_KEYS.widget.theme, 'light');
  const colorStyles = getColorStyles(widgetTheme);

  const strokeColor =
    validation.status !== 'default'
      ? validation.status === 'error'
        ? colorStyles.validation.error.border
        : colorStyles.validation.warning.border
      : colorStyles.border;

  return (
    <AutoLayout width="fill-parent" spacing={4} direction="vertical" verticalAlignItems="center">
      <AutoLayout width="fill-parent" spacing={8} verticalAlignItems="center">
        <Input
          placeholder={placeholder}
          fontSize={TextStyles[size].size}
          fill={colorStyles.fg.default}
          width="fill-parent"
          onTextEditEnd={onTextEditEnd}
          value={value}
          inputFrameProps={{
            fill: colorStyles.surface.background,
            stroke: strokeColor,
            cornerRadius: 8,
            padding: {
              horizontal: commonSizings[size].padding.x,
              vertical: commonSizings[size].padding.y,
            },
          }}
          inputBehavior={inputBehavior}
          {...rest}
        />
        <SVG hidden={!hasIconLeft} src={IconLink(colorStyles.fg.default)} />
      </AutoLayout>
      <Validation validation={validation} size="small" />
    </AutoLayout>
  );
};
