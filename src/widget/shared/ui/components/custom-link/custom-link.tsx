import type { CommonSizes } from '../../../styles';

import { CustomText } from '../custom-text';

interface CustomLinkProps extends TextProps {
  size?: CommonSizes;
}

export const CustomLink = ({ href = '', children, size = 'small', ...rest }: CustomLinkProps) => {
  return (
    <CustomText
      hoverStyle={{
        fill: '#fff',
      }}
      href={href}
      name="issue-title"
      size={size}
      width="fill-parent"
      textDecoration={href ? 'underline' : 'none'}
      {...rest}
    >
      {children}
    </CustomText>
  );
};
