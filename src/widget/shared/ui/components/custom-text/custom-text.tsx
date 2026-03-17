import { Text } from '../../../../widget-components';
import { type CommonSizes, TextStyles } from '../../../styles';

interface CustomTextProps extends TextProps {
  size?: CommonSizes;
}

export const CustomText = ({ children, size, href = '', ...rest }: CustomTextProps) => {
  return (
    <Text
      href={href}
      width={'fill-parent'}
      fontSize={size ? TextStyles[size].size : TextStyles.small.size}
      lineHeight={size ? TextStyles[size].lineHeight : TextStyles.small.lineHeight}
      textDecoration={href ? 'underline' : 'none'}
      {...rest}
    >
      {children}
    </Text>
  );
};
