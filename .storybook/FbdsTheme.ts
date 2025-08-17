import { create } from 'storybook/theming';

export const darkTheme = create(
  {
    base: 'dark',
    brandTitle: 'Fbds - Storybook',
    brandUrl: 'https://example.com',
    brandImage: '/storybook-dark.svg',
    brandTarget: '_self',
  }
);

export const lightTheme = create(
  {
    base: 'light',
    brandTitle: 'Fbds - Storybook',
    brandUrl: 'https://example.com',
    brandImage: '/storybook-dark.svg',
    brandTarget: '_self',
  }
);
