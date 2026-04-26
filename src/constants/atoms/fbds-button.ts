import type { TooltipPropsOptionnal } from '@/constants/atoms/fbds-tooltip';
import type { Icon } from '@/constants/icon';

export const ButtonSize = {
  Md: 'md',
  Sm: 'sm',
} as const;

export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];

export const ButtonVariant = {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  Success: 'success',
  SuccessSecondary: 'success-secondary',
  Danger: 'danger',
  DangerSecondary: 'danger-secondary',
} as const;

export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant];

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label?: string;
  icon?: Icon;
  disabled?: boolean;
  href?: string;
  target?: string;
  to?: string;
  tooltip?: string;
  tooltipOptions?: TooltipPropsOptionnal;
};
