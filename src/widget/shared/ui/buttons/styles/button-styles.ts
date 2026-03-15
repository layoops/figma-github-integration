import type { ButtonAppearance, ButtonState } from '../types';

import { palette } from '../../../styles';

export type ButtonStateStyles = {
  [key in ButtonState | 'hover']: {
    text?: string;
    bg?: string;
    border?: string;
  };
};

export const buttonStyles: Record<ButtonAppearance, ButtonStateStyles> = {
  primary: {
    default: {
      text: palette.white,
      bg: '#1f883d',
      border: '#1F793A',
    },
    hover: {
      bg: '#1c8139',
      text: palette.white,
      border: '#1D7337',
    },
    selected: {
      text: palette.white,
      bg: '#197935',
      border: '#1A6C33',
    },
    disabled: {
      text: '#ffffffcc',
      bg: '#95d8a6',
      border: '#1f793a',
    },
  },
  secondary: {
    default: {
      bg: '#f6f8fa',
      border: '#D0D7DE',
    },
    hover: {
      bg: '#eaedf1',
      border: '#cccfd2',
    },
    selected: {
      bg: '#e4e8ec',
      border: '#c7cbcf',
    },
    disabled: {
      bg: '#eef1f4',
      border: '#f6f8fa',
    },
  },
  ghost: {
    default: {},
    hover: {
      bg: '#eaedf1',
    },
    selected: {
      bg: '#e4e8ec',
    },
    disabled: {
      text: '#8C959F',
    },
  },
  none: {
    default: {},
    hover: {},
    selected: {},
    disabled: {},
  },
};
