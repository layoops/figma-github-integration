import type { CommonSizes } from '../../styles/common';
import type { ValidationContent } from '../validation';

import { AutoLayout, Input, SVG } from '../../../widget-components';
import { ColorStyles, TextStyles } from '../../styles';
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

  return (
    <AutoLayout width="fill-parent" spacing={4} direction="vertical" verticalAlignItems="center">
      <AutoLayout width="fill-parent" spacing={8} verticalAlignItems="center">
        <Input
          placeholder={placeholder}
          fontSize={TextStyles[size].size}
          fill={ColorStyles.validation.default.text}
          width="fill-parent"
          onTextEditEnd={onTextEditEnd}
          value={value}
          inputFrameProps={{
            fill: ColorStyles.validation.default.bg,
            stroke:
              validation.status !== 'default'
                ? ColorStyles.validation[validation.status].text
                : ColorStyles.border,
            cornerRadius: 8,
            padding: {
              horizontal: commonSizings[size].padding.x,
              vertical: commonSizings[size].padding.y,
            },
          }}
          inputBehavior={inputBehavior}
          {...rest}
        />
        <SVG hidden={!hasIconLeft} src={IconLink('black')} />
      </AutoLayout>
      <Validation validation={validation} size="small" />
    </AutoLayout>
  );
};
