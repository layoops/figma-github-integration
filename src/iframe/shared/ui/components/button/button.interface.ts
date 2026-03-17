import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { LinkProps } from 'react-router-dom';

interface ButtonBaseProps {
  appearance: 'secondary' | 'primary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  isActive?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  isLoading?: boolean;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonBaseProps {}

export interface ButtonIconProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<ButtonBaseProps, 'iconLeft' | 'iconRight'> {}

export interface ButtonLinkProps extends LinkProps, ButtonBaseProps {}
