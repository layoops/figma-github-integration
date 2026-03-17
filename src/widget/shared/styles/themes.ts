import type { WidgetTheme } from '../../../global-shared/application-settings';

export const themes: Record<
  WidgetTheme,
  {
    surface: { background: string; muted: string };
    border: { default: string; muted: string };
    fg: {
      default: string;
      muted: string;
      accent: string;
      danger: string;
      success: string;
      attention: string;
      done: string;
      severe: string;
      neutral: string;
      sponsors: string;
      open: string;
      closed: string;
      onEmphasis: string;
    };
    state: {
      open: { fg: string; bg: string };
      closed: { fg: string; bg: string };
      merged: { fg: string; bg: string };
      draft: { fg: string; bg: string };
    };
    validation: {
      error: { text: string; border: string };
      warning: { text: string; border: string };
      disabled: { text: string };
    };
    button: {
      primary: {
        bg: string;
        bgHover: string;
        bgSelected: string;
        bgDisabled: string;
        border: string;
        text: string;
        textDisabled: string;
      };
      secondary: {
        bg: string;
        bgHover: string;
        bgSelected: string;
        bgDisabled: string;
        border: string;
        text: string;
        textDisabled: string;
      };
      ghost: {
        bgHover: string;
        bgSelected: string;
        textDisabled: string;
      };
    };
    header: { bg: string };
  }
> = {
  light: {
    surface: {
      background: '#ffffff',
      muted: '#f6f8fa',
    },
    border: {
      default: '#d1d9e0',
      muted: '#d8dee4',
    },
    fg: {
      default: '#1f2328',
      muted: '#59636e',
      accent: '#0969da',
      danger: '#d1242f',
      success: '#1a7f37',
      attention: '#9a6700',
      done: '#8250df',
      severe: '#bc4c00',
      neutral: '#59636e',
      sponsors: '#bf3989',
      open: '#1a7f37',
      closed: '#d1242f',
      onEmphasis: '#ffffff',
    },
    state: {
      open: { fg: '#1a7f37', bg: '#1f883d' },
      closed: { fg: '#d1242f', bg: '#cf222e' },
      merged: { fg: '#8250df', bg: '#8250df' },
      draft: { fg: '#59636e', bg: '#59636e' },
    },
    validation: {
      error: { text: '#d1242f', border: '#cf222e' },
      warning: { text: '#9a6700', border: '#9a6700' },
      disabled: { text: '#818b98' },
    },
    button: {
      primary: {
        bg: '#1f883d',
        bgHover: '#1c8139',
        bgSelected: '#197935',
        bgDisabled: '#95d8a6',
        border: '#1f232826',
        text: '#ffffff',
        textDisabled: '#ffffffcc',
      },
      secondary: {
        bg: '#f6f8fa',
        bgHover: '#eff2f5',
        bgSelected: '#e6eaef',
        bgDisabled: '#eff2f5',
        border: '#d1d9e0',
        text: '#25292e',
        textDisabled: '#818b98',
      },
      ghost: {
        bgHover: '#eaedf1',
        bgSelected: '#e4e8ec',
        textDisabled: '#8c959f',
      },
    },
    header: { bg: '#25292e' },
  },
  dark: {
    surface: {
      background: '#0d1117',
      muted: '#151b23',
    },
    border: {
      default: '#3d444d',
      muted: '#2a313c',
    },
    fg: {
      default: '#f0f6fc',
      muted: '#9198a1',
      accent: '#4493f8',
      danger: '#f85149',
      success: '#3fb950',
      attention: '#d29922',
      done: '#ab7df8',
      severe: '#db6d28',
      neutral: '#9198a1',
      sponsors: '#db61a2',
      open: '#3fb950',
      closed: '#f85149',
      onEmphasis: '#ffffff',
    },
    state: {
      open: { fg: '#3fb950', bg: '#238636' },
      closed: { fg: '#f85149', bg: '#da3633' },
      merged: { fg: '#ab7df8', bg: '#8957e5' },
      draft: { fg: '#9198a1', bg: '#656c76' },
    },
    validation: {
      error: { text: '#f85149', border: '#da3633' },
      warning: { text: '#d29922', border: '#d29922' },
      disabled: { text: '#656c76' },
    },
    button: {
      primary: {
        bg: '#238636',
        bgHover: '#29903b',
        bgSelected: '#2e9a40',
        bgDisabled: '#105823',
        border: '#ffffff26',
        text: '#ffffff',
        textDisabled: '#ffffff66',
      },
      secondary: {
        bg: '#212830',
        bgHover: '#262c36',
        bgSelected: '#2a313c',
        bgDisabled: '#212830',
        border: '#3d444d',
        text: '#f0f6fc',
        textDisabled: '#656c76',
      },
      ghost: {
        bgHover: '#656c7633',
        bgSelected: '#2a313c',
        textDisabled: '#656c76',
      },
    },
    header: { bg: '#151b23' },
  },
};

export type { WidgetTheme };
