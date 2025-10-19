export const PrimaryPositioning = {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right',
} as const;
export type PrimaryPositioning = (typeof PrimaryPositioning)[keyof typeof PrimaryPositioning];

export const SecondaryPositioning = {
  ...PrimaryPositioning,
  Full: 'full',
} as const;
export type SecondaryPositioning = (typeof SecondaryPositioning)[keyof typeof SecondaryPositioning];

export const Positioning = {
  ...PrimaryPositioning,
  TopFull: 'top-full',
  TopLeft: 'top-left',
  TopRight: 'top-right',
  BottomFull: 'bottom-full',
  BottomLeft: 'bottom-left',
  BottomRight: 'bottom-right',
  LeftFull: 'left-full',
  LeftTop: 'left-top',
  LeftBottom: 'left-bottom',
  RightFull: 'right-full',
  RightTop: 'right-top',
  RightBottom: 'right-bottom',
} as const;
export type Positioning = (typeof Positioning)[keyof typeof Positioning];
