export const Contrast = {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
} as const;

export type Contrast = (typeof Contrast)[keyof typeof Contrast];

export const Theme = {
  BaseSurface: 'base-surface',
  BaseSurfaceInverted: 'base-surface-inverted',
  BasePrimary: 'base-primary',
  BaseAlert: 'base-alert',
  BaseWarning: 'base-warning',
  BaseSuccess: 'base-success',
  BaseInfo: 'base-info',
  BaseDisable: 'base-disable',
  ContainerPrimary: 'container-primary',
  ContainerAlert: 'container-alert',
  ContainerWarning: 'container-warning',
  ContainerSuccess: 'container-success',
  ContainerInfo: 'container-info',
  ContainerAccent_1: 'container-accent-1',
  ContainerAccent_2: 'container-accent-2',
  ContainerAccent_3: 'container-accent-3',
  ContainerAccent_4: 'container-accent-4',
} as const;

export type Theme = (typeof Theme)[keyof typeof Theme];

export const OnTheme = {
  [Theme.BaseSurface]: 'on-base-surface-high',
  [Theme.BaseSurfaceInverted]: 'on-base-surface-inverted-high',
  [Theme.BasePrimary]: 'on-base-primary',
  [Theme.BaseAlert]: 'on-base-alert',
  [Theme.BaseWarning]: 'on-base-warning',
  [Theme.BaseSuccess]: 'on-base-success',
  [Theme.BaseInfo]: 'on-base-info',
  [Theme.BaseDisable]: 'on-base-disable',
  [Theme.ContainerPrimary]: 'on-container-primary',
  [Theme.ContainerAlert]: 'on-container-alert',
  [Theme.ContainerWarning]: 'on-container-warning',
  [Theme.ContainerSuccess]: 'on-container-success',
  [Theme.ContainerInfo]: 'on-container-info',
  [Theme.ContainerAccent_1]: 'on-container-accent-1',
  [Theme.ContainerAccent_2]: 'on-container-accent-2',
  [Theme.ContainerAccent_3]: 'on-container-accent-3',
  [Theme.ContainerAccent_4]: 'on-container-accent-4',
} as const;

export type OnTheme = (typeof OnTheme)[keyof typeof OnTheme];

export const StateLayerTheme = {
  [Theme.BaseSurface]: {
    hover: 'bg-fbds-state-layer-base-surface-hover',
    press: 'bg-fbds-state-layer-base-surface-press',
  },
  [Theme.BaseSurfaceInverted]: {
    hover: 'bg-fbds-state-layer-base-surface-inverted-hover',
    press: 'bg-fbds-state-layer-base-surface-inverted-press',
  },
  [Theme.BasePrimary]: {
    hover: 'bg-fbds-state-layer-base-primary-hover',
    press: 'bg-fbds-state-layer-base-primary-press',
  },
  [Theme.BaseAlert]: {
    hover: 'bg-fbds-state-layer-base-alert-hover',
    press: 'bg-fbds-state-layer-base-alert-press',
  },
  [Theme.BaseWarning]: {
    hover: 'bg-fbds-state-layer-base-warning-hover',
    press: 'bg-fbds-state-layer-base-warning-press',
  },
  [Theme.BaseSuccess]: {
    hover: 'bg-fbds-state-layer-base-success-hover',
    press: 'bg-fbds-state-layer-base-success-press',
  },
  [Theme.BaseInfo]: {
    hover: 'bg-fbds-state-layer-base-info-hover',
    press: 'bg-fbds-state-layer-base-info-press',
  },
  [Theme.BaseDisable]: {
    hover: 'bg-fbds-state-layer-base-disable-hover',
    press: 'bg-fbds-state-layer-base-disable-press',
  },
  [Theme.ContainerPrimary]: {
    hover: 'bg-fbds-state-layer-container-primary-hover',
    press: 'bg-fbds-state-layer-container-primary-press',
  },
  [Theme.ContainerAlert]: {
    hover: 'bg-fbds-state-layer-container-alert-hover',
    press: 'bg-fbds-state-layer-container-alert-press',
  },
  [Theme.ContainerWarning]: {
    hover: 'bg-fbds-state-layer-container-warning-hover',
    press: 'bg-fbds-state-layer-container-warning-press',
  },
  [Theme.ContainerSuccess]: {
    hover: 'bg-fbds-state-layer-container-success-hover',
    press: 'bg-fbds-state-layer-container-success-press',
  },
  [Theme.ContainerInfo]: {
    hover: 'bg-fbds-state-layer-container-info-hover',
    press: 'bg-fbds-state-layer-container-info-press',
  },
  [Theme.ContainerAccent_1]: {
    hover: 'bg-fbds-state-layer-container-accent-1-hover',
    press: 'bg-fbds-state-layer-container-accent-1-press',
  },
  [Theme.ContainerAccent_2]: {
    hover: 'bg-fbds-state-layer-container-accent-2-hover',
    press: 'bg-fbds-state-layer-container-accent-2-press',
  },
  [Theme.ContainerAccent_3]: {
    hover: 'bg-fbds-state-layer-container-accent-3-hover',
    press: 'bg-fbds-state-layer-container-accent-3-press',
  },
  [Theme.ContainerAccent_4]: {
    hover: 'bg-fbds-state-layer-container-accent-4-hover',
    press: 'bg-fbds-state-layer-container-accent-4-press',
  },
} as const;

export type StateLayerTheme = (typeof StateLayerTheme)[keyof typeof StateLayerTheme];

export const StateLayerDefault = {
  Low: {
    hover: 'bg-fbds-state-layer-low-hover',
    press: 'bg-fbds-state-layer-low-press',
  },
  High: {
    hover: 'bg-fbds-state-layer-high-hover',
    press: 'bg-fbds-state-layer-high-press',
  },
} as const;

export type StateLayerDefault = (typeof StateLayerDefault)[keyof typeof StateLayerDefault];
