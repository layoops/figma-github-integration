import type { CommonSizes } from '../../../styles';

export type ButtonState = 'default' | 'selected' | 'disabled';

export type ButtonAppearance = 'primary' | 'secondary' | 'ghost' | 'none';

export interface ButtonProps extends AutoLayoutProps, Pick<TextProps, 'fontWeight'> {
  onClick?: () => void;
  text?: string;
  appearance: ButtonAppearance;
  state?: ButtonState;
  size?: CommonSizes;
  href?: string;
  iconLeft?: {
    rotation?: number;
    src: string;
  };
  leftChildren?: FigmaDeclarativeNode;
  iconRight?: {
    rotation?: number;
    src: string;
  };
  color?: string;
}

export interface IconButtonProps extends AutoLayoutProps {
  icon?: 'reload' | 'chevron';
  iconSrc?: string;
  appearance: ButtonAppearance;
  state?: ButtonState;
  size?: CommonSizes;
  iconRotation?: number;
  href?: string;
}

export type ButtonStateStyles = {
  [key in ButtonState | 'hover']: {
    text?: string;
    bg?: string;
    border?: string;
  };
};
