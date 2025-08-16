import type { Icons } from '@/constants/icons';

export type Icon = (typeof Icons)[keyof typeof Icons];
