import { palette } from './palette';

type Sizing = 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';

export const ColorStyles = {
  surface: {
    background: palette.white,
    muted: '#F6F8FA',
  },
  border: '#e8ebef',
  validation: {
    default: {
      text: palette.black,
      bg: palette.white,
    },
    inverted: {
      text: palette.white,
      bg: palette.black,
    },
    error: {
      text: palette.red[500],
      bg: palette.red[50],
    },
    warning: {
      text: palette.orange[500],
      bg: palette.orange[50],
    },
    disabled: {
      text: palette.gray[600],
      bg: palette.gray[100],
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
