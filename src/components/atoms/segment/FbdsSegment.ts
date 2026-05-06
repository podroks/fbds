import type { TooltipPropsOptionnal } from '@/constants/atoms/fbds-tooltip';
import type { Icon } from '@/constants/icon';

export type Segment = {
  id: string | number;
  label?: string;
  icon?: Icon;
  disabled?: boolean;
  tooltip?: string;
  tooltipOptions?: TooltipPropsOptionnal;
};

export type SegmentProps = {
  segments: Segment[];
  multiple?: boolean;
  required?: boolean;
};
