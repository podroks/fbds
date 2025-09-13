import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { Icon } from '@/constants/icon';
import { Theme } from '@/constants/theme';

import FbdsTag from '@/components/atoms/tag/FbdsTag.vue';

const meta = {
  title: 'FBDS/Atomes/Tag',
  component: FbdsTag,
  tags: ['!dev'],
  argTypes: {
    label: {
      control: 'text',
    },
    icon: {
      control: 'select',
      options: Object.keys(Icon),
      mapping: Icon,
    },
    rightIcon: {
      control: 'select',
      options: Object.keys(Icon),
      mapping: Icon,
    },
    interactif: {
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
    label: 'libellé tag',
    icon: undefined,
    rightIcon: undefined,
    interactif: false,
    theme: Theme.BasePrimary,
    tooltip: undefined,
    tooltipOptions: {},
  },
  render: (args) => ({
    components: { FbdsTag },
    setup: () => ({ args }),
    template: '<FbdsTag v-bind="args"/>',
  }),
} satisfies Meta<typeof FbdsTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
