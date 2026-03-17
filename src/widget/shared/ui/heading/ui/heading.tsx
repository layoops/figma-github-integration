import type { HeadingProps } from '../types';

import { Text } from '../../../../widget-components';
import { HeadingLevelStyles } from '../styles/heading-styles';

export const Heading = ({ children, level, ...rest }: HeadingProps) => {
  return (
    <Text fontSize={HeadingLevelStyles[level].fontSize} {...rest}>
      {children}
    </Text>
  );
};
