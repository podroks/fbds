import type { TooltipPropsOptionnal } from '@/constants/atoms/fbds-tooltip';
import type { Icon } from '@/constants/icon';
import type { Theme } from '@/constants/theme';

export const Contrast = {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
} as const;

export type Contrast = (typeof Contrast)[keyof typeof Contrast];

export type ButtonProps = {
  contrast?: Contrast;
  theme?: Exclude<Theme, 'base-disable'>;
  label?: string;
  icon?: Icon;
  disabled?: boolean;
  href?: string;
  target?: string;
  to?: string;
  tooltip?: string;
  tooltipOptions?: TooltipPropsOptionnal;
};
