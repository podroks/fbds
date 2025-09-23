import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { Icon } from '@/constants/icon';
import { Theme } from '@/constants/theme';

import FbdsSpinner from '@/components/atoms/spinner/FbdsSpinner.vue';

const meta = {
  title: 'FBDS/Atomes/Spinner',
  component: FbdsSpinner,
  tags: ['!dev'],
  argTypes: {
    icon: {
      control: 'select',
      options: Object.keys(Icon),
      mapping: Icon,
    },
    size: {
      control: 'number',
    },
    theme: {
      control: 'select',
      options: Object.values(Theme).filter((t) => t !== Theme.BaseDisable),
    },
  },
  args: {
    icon: Icon.facSpinner,
    size: 5,
    theme: Theme.BaseSurfaceInverted,
  },
  render: (args) => ({
    components: { FbdsSpinner },
    setup: () => ({ args }),
    template: '<FbdsSpinner v-bind="args"/>',
  }),
} satisfies Meta<typeof FbdsSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
