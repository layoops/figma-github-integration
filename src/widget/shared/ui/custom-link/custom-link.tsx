import { type CommonSizes } from '../../styles';
import { CustomText } from '../custom-text';

export type CustomLinkProps = {
  size?: CommonSizes;
} & TextProps;

export const CustomLink = ({ href = '', children, size = 'small', ...rest }: CustomLinkProps) => {
  return (
    <CustomText
      hoverStyle={{
        fill: '#0969da',
      }}
      fontWeight={600}
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
