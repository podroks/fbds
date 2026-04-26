import type { TooltipPropsOptionnal } from '@/constants/atoms/fbds-tooltip';
import type { Icon } from '@/constants/icon';

export const Size = {
  Md: 'md',
  Sm: 'sm',
} as const;

export type Size = (typeof Size)[keyof typeof Size];

export const Variant = {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  Success: 'success',
  SuccessSecondary: 'success-secondary',
  Danger: 'danger',
  DangerSecondary: 'danger-secondary',
} as const;

export type Variant = (typeof Variant)[keyof typeof Variant];

export type ButtonProps = {
  variant?: Variant;
  size?: Size;
  label?: string;
  icon?: Icon;
  disabled?: boolean;
  href?: string;
  target?: string;
  to?: string;
  tooltip?: string;
  tooltipOptions?: TooltipPropsOptionnal;
};
