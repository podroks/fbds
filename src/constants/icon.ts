import { faFigma as fabFigma } from '@fortawesome/free-brands-svg-icons';
import { faCircle as farCircle, faSquare as farSquare } from '@fortawesome/free-regular-svg-icons';
import {
  faCircle as fasCircle,
  faCircleCheck as fasCircleCheck,
  faCircleDot as fasCircleDot,
  faHandPointer as fasHandPointer,
  faSpinner as fasSpinner,
  faSquare as fasSquare,
  faSquareCheck as fasSquareCheck,
  faSquareMinus as fasSquareMinus,
  faThumbsDown as fasThumbsDown,
  faThumbsUp as fasThumbsUp,
} from '@fortawesome/free-solid-svg-icons';

import FbdsIconFb from '@/components/subatoms/icon/custom/FbdsIconFb.vue';
import FbdsIconSpinner from '@/components/subatoms/icon/custom/FbdsIconSpinner.vue';

export const Icon = {
  fabFigma,
  facFb: FbdsIconFb,
  facSpinner: FbdsIconSpinner,
  farCircle,
  farSquare,
  fasCircle,
  fasCircleCheck,
  fasCircleDot,
  fasHandPointer,
  fasSpinner,
  fasSquare,
  fasSquareCheck,
  fasSquareMinus,
  fasThumbsDown,
  fasThumbsUp,
} as const;

export type Icon = (typeof Icon)[keyof typeof Icon];
