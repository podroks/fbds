import type { Positioning } from '@/constants/positioning';

export type TooltipProps = {
  trigger: HTMLElement | { el: HTMLElement | null } | string | null;
  container?: HTMLElement | { el: HTMLElement | null } | string | null;
  positioning?: Positioning;
  offset?: number;
  containerOffset?: number;
};
