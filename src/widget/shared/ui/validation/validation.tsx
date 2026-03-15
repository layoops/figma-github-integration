import type { CommonSizes } from '../../styles';

import { AutoLayout, Text } from '../../../widget-components';
import { ColorStyles, TextStyles } from '../../styles';

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

  const colors = validation && ColorStyles.validation?.[validation.status];

  return (
    <AutoLayout hidden={Boolean(validation?.status === 'default')} width="hug-contents">
      <Text fill={colors?.text ?? ''} fontSize={TextStyles[size].size}>
        Validation
      </Text>
    </AutoLayout>
  );
};
