export const Contrast = {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
} as const;

export type Contrast = (typeof Contrast)[keyof typeof Contrast];
