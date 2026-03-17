export type HeadingLevel = 'one' | 'two' | 'three';

export type HeadingProps = {
  level: HeadingLevel;
} & TextProps;
