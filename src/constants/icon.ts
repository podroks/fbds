import { faFigma as fabFigma } from '@fortawesome/free-brands-svg-icons';
import { faSquare as farSquare } from '@fortawesome/free-regular-svg-icons';
import {
  faHandPointer as fasHandPointer,
  faSquare as fasSquare,
  faThumbsDown as fasThumbsDown,
  faThumbsUp as fasThumbsUp,
} from '@fortawesome/free-solid-svg-icons';

import FbdsIconFb from '@/components/subatoms/icon/custom/FbdsIconFb.vue';

export const Icon = {
  fabFigma,
  facFb: FbdsIconFb,
  farSquare,
  fasHandPointer,
  fasSquare,
  fasThumbsDown,
  fasThumbsUp,
} as const;

export type Icon = (typeof Icon)[keyof typeof Icon];
