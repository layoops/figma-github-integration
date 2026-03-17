import type { ButtonHTMLAttributes } from 'react';

interface CustomButtonLinkProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  text: string;
}

export const CustomButtonLink = ({ text, ...rest }: CustomButtonLinkProps) => {
  return (
    <button
      style={{
        cursor: 'pointer',
        textDecoration: 'underline',
        textUnderlineOffset: '2px',
        color: '#2f81f7',
      }}
      {...rest}
    >
      {text}
    </button>
  );
};
