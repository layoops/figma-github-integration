import { Colors } from './colors';

type Sizing = 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';

export const ColorStyles = {
  surface: {
    background: Colors.white,
  },
  border: '#e8ebef',
  validation: {
    default: {
      text: Colors.black,
      bg: Colors.white,
    },
    inverted: {
      text: Colors.white,
      bg: Colors.black,
    },
    error: {
      text: Colors.red[500],
      bg: Colors.red[50],
    },
    warning: {
      text: Colors.orange[500],
      bg: Colors.orange[50],
    },
    disabled: {
      text: Colors.gray[600],
      bg: Colors.gray[100],
    },
  },
};

type TextStylesTypes = {
  [key in Sizing]?: { size: number; lineHeight: number };
};

export const TextStyles: TextStylesTypes = {
  'extra-small': {
    size: 12,
    lineHeight: 16,
  },
  small: {
    size: 14,
    lineHeight: 20,
  },
  medium: {
    size: 16,
    lineHeight: 20,
  },
  large: {
    size: 20,
    lineHeight: 24,
  },
  'extra-large': {
    size: 22,
    lineHeight: 28,
  },
};

export const spacingStyles = {
  'extra-small': 4,
  small: 8,
  medium: 12,
  large: 16,
  'extra-large': 20,
};

export const borderRadius = {
  small: 4,
  medium: 8,
  large: 12,
};

export const iconStyles = {
  sizing: {
    small: 16,
    medium: 22,
    large: 28,
  },
};
