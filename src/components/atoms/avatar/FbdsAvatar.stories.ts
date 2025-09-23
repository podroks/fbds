import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { Theme } from '@/constants/theme';

import FbdsAvatar from '@/components/atoms/avatar/FbdsAvatar.vue';

const meta = {
  title: 'FBDS/Atomes/Avatar',
  component: FbdsAvatar,
  tags: ['!dev'],
  argTypes: {
    fallback: { control: 'text' },
    theme: {
      control: 'select',
      options: Object.values(Theme).filter((t) => t !== Theme.BaseDisable),
    },
    color: {
      control: 'color',
    },
    src: { control: 'text' },
    alt: { control: 'text' },
    tooltip: { control: 'text' },
    tooltipOptions: { control: 'object' },
  },
  args: {
    fallback: 'AB',
    theme: Theme.BasePrimary,
    color: undefined,
    tooltip: 'Tooltip',
    tooltipOptions: {},
  },
  render: (args) => ({
    components: { FbdsAvatar },
    setup: () => ({ args }),
    template: '<FbdsAvatar v-bind="args"/>',
  }),
} satisfies Meta<typeof FbdsAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
