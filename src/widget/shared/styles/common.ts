import { spacingStyles } from './styles';

export type CommonSizes = 'extra-small' | 'small' | 'medium' | 'large';
type Sizing = {
  height: number;
  padding: {
    x: number;
    y: number;
  };
  spacing: number;
};

export const commonSizings: Record<CommonSizes, Sizing> = {
  'extra-small': {
    height: 24,
    padding: {
      x: spacingStyles.small,
      y: 4,
    },
    spacing: spacingStyles['extra-small'],
  },
  small: {
    height: 28,
    padding: {
      x: spacingStyles.medium,
      y: 5,
    },
    spacing: spacingStyles['extra-small'],
  },
  medium: {
    height: 32,
    padding: {
      x: spacingStyles.medium,
      y: 6,
    },
    spacing: spacingStyles['small'],
  },
  large: {
    height: 40,
    padding: {
      x: spacingStyles.large,
      y: 12,
    },
    spacing: spacingStyles['small'],
  },
};
