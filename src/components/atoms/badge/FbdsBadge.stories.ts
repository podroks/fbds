import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { Theme } from '@/constants/theme';

import FbdsBadge from '@/components/atoms/badge/FbdsBadge.vue';

const meta = {
  title: 'FBDS/Atomes/Badge',
  component: FbdsBadge,
  tags: ['!dev'],
  argTypes: {
    value: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    pined: {
      control: 'boolean',
    },
    theme: {
      control: 'select',
      options: Object.values(Theme).filter((t) => t !== Theme.BaseDisable),
    },
    tooltip: {
      control: 'text',
    },
    tooltipOptions: {
      control: 'object',
    },
  },
  args: {
    value: 10,
    max: 99,
    pined: false,
    theme: Theme.BasePrimary,
    tooltip: '',
    tooltipOptions: {},
  },
  render: (args) => ({
    components: { FbdsBadge },
    setup: () => ({ args }),
    template: '<FbdsBadge v-bind="args"/>',
  }),
} satisfies Meta<typeof FbdsBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
