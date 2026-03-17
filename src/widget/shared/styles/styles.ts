import type { WidgetTheme } from './themes';

import { themes } from './themes';

type Sizing = 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';

export const getColorStyles = (theme: WidgetTheme) => ({
  surface: themes[theme].surface,
  border: themes[theme].border.default,
  borderMuted: themes[theme].border.muted,
  fg: themes[theme].fg,
  state: themes[theme].state,
  validation: themes[theme].validation,
  button: themes[theme].button,
  header: themes[theme].header,
});

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
