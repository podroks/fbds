import type { Preview } from '@storybook/vue3'
import '../src/assets/styles/main.css'
import '../src/assets/styles/main.scss'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
