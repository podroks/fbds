import { faFigma as fabFigma } from '@fortawesome/free-brands-svg-icons';
import { faCircle as farCircle, faSquare as farSquare } from '@fortawesome/free-regular-svg-icons';
import {
  faCircle as fasCircle,
  faCircleCheck as fasCircleCheck,
  faCircleDot as fasCircleDot,
  faHandPointer as fasHandPointer,
  faSquare as fasSquare,
  faSquareCheck as fasSquareCheck,
  faSquareMinus as fasSquareMinus,
  faThumbsDown as fasThumbsDown,
  faThumbsUp as fasThumbsUp,
} from '@fortawesome/free-solid-svg-icons';

import FbdsIconFb from '@/components/subatoms/icon/custom/FbdsIconFb.vue';

export const Icon = {
  fabFigma,
  facFb: FbdsIconFb,
  farCircle,
  farSquare,
  fasCircle,
  fasCircleCheck,
  fasCircleDot,
  fasHandPointer,
  fasSquare,
  fasSquareCheck,
  fasSquareMinus,
  fasThumbsDown,
  fasThumbsUp,
} as const;

export type Icon = (typeof Icon)[keyof typeof Icon];
