import type { Preview } from '@storybook/vue3'
import '../src/assets/styles/main.css'
import '../src/assets/styles/main.scss'
import './preview.scss'
import { watch } from 'vue';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Thème global pour les composants',
      toolbar: {
        title: 'Theme',
        defaultValue: 'light',
        items: [{ value: 'light', title: "Clair", icon: "sun"}, { value: 'dark', title: "Sombre", icon: "moon"}],
        dynamicTitle: true,
      },
    },
  },
}

export const decorators = [
  (story, context) => {
    if (!context.globals.theme && typeof window !== 'undefined') {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (prefersDark && context.globals.theme !== 'dark') {
        context.globals.theme = 'dark';
      }
    }

    watch(() => context.globals.theme, (newTheme) => {
      const documentElement = window.document.documentElement;
      documentElement.setAttribute('theme', newTheme )
    }, { immediate: true })

    return {
      components: { Story: story() },
      template: '<story />',
    };
  },
];

export default preview
