import type { Positioning } from '@/constants/positioning';

export type TooltipProps = {
  trigger: HTMLElement | { el: HTMLElement | null } | string | null;
  container?: HTMLElement | { el: HTMLElement | null } | string | null;
  positioning?: Positioning;
  offset?: number;
  containerOffset?: number;
  class?: string;
};

export type TooltipPropsOptionnal = {
  trigger?: TooltipProps['trigger'];
  container?: TooltipProps['container'];
  positioning?: TooltipProps['positioning'];
  offset?: TooltipProps['offset'];
  containerOffset?: TooltipProps['containerOffset'];
};
