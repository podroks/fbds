import type { TooltipPropsOptionnal } from '@/constants/atoms/fbds-tooltip';
import type { Icon } from '@/constants/icon';

export type Tab = {
  id: string | number;
  label?: string;
  icon?: Icon;
  disabled?: boolean;
  tooltip?: string;
  tooltipOptions?: TooltipPropsOptionnal;
};
