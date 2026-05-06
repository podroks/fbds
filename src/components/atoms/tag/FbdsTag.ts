export const TagTheme = {
  Primary: 'primary',
  Alert: 'alert',
  Warning: 'warning',
  Success: 'success',
  Info: 'info',
  Accent1: 'accent-1',
  Accent2: 'accent-2',
  Accent3: 'accent-3',
  Accent4: 'accent-4',
  Ghost: 'ghost',
} as const;
export type TagTheme = (typeof TagTheme)[keyof typeof TagTheme];
