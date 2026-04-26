export const SpinnerSize = {
  Sm: 'sm',
  Md: 'md',
  Lg: 'lg',
} as const;

export type SpinnerSize = (typeof SpinnerSize)[keyof typeof SpinnerSize];
