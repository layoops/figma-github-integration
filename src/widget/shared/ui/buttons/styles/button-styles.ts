import type { WidgetTheme } from '../../../styles/themes';
import type { ButtonAppearance, ButtonState } from '../types';

import { getColorStyles } from '../../../styles';

export type ButtonStateStyles = {
  [key in ButtonState | 'hover']: {
    text?: string;
    bg?: string;
    border?: string;
  };
};

export const getButtonStyles = (
  theme: WidgetTheme
): Record<ButtonAppearance, ButtonStateStyles> => {
  const c = getColorStyles(theme);

  return {
    primary: {
      default: {
        text: c.button.primary.text,
        bg: c.button.primary.bg,
        border: c.button.primary.border,
      },
      hover: {
        bg: c.button.primary.bgHover,
        text: c.button.primary.text,
        border: c.button.primary.border,
      },
      selected: {
        text: c.button.primary.text,
        bg: c.button.primary.bgSelected,
        border: c.button.primary.border,
      },
      disabled: {
        text: c.button.primary.textDisabled,
        bg: c.button.primary.bgDisabled,
        border: c.button.primary.border,
      },
    },
    secondary: {
      default: {
        bg: c.button.secondary.bg,
        border: c.button.secondary.border,
        text: c.button.secondary.text,
      },
      hover: {
        bg: c.button.secondary.bgHover,
        border: c.button.secondary.border,
      },
      selected: {
        bg: c.button.secondary.bgSelected,
        border: c.button.secondary.border,
      },
      disabled: {
        bg: c.button.secondary.bgDisabled,
        border: c.button.secondary.border,
        text: c.button.secondary.textDisabled,
      },
    },
    ghost: {
      default: {
        text: c.button.primary.text,
      },
      hover: {
        bg: c.button.ghost.bgHover,
        text: c.button.primary.text,
      },
      selected: {
        bg: c.button.ghost.bgSelected,
        text: c.button.primary.text,
      },
      disabled: {
        text: c.button.ghost.textDisabled,
      },
    },
    none: {
      default: {},
      hover: {},
      selected: {},
      disabled: {},
    },
  };
};
