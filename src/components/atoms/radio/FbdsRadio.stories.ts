import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { useArgs } from 'storybook/internal/preview-api';

import FbdsRadio from '@/components/atoms/radio/FbdsRadio.vue';

const meta = {
  title: 'FBDS/Atomes/Radio',
  component: FbdsRadio,
  tags: ['!dev'],
  argTypes: {
    checked: {
      control: 'boolean',
    },
    name: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    tooltip: {
      control: 'text',
    },
    tooltipOptions: {
      control: 'object',
    },
  },
  args: {
    checked: true,
    label: 'libellé Radio',
    name: 'select',
    disabled: false,
    tooltip: 'Tooltip',
    tooltipOptions: {},
  },
  render: (_) => {
    const [storyArgs, updateArgs] = useArgs();
    return {
      components: { FbdsRadio },
      setup: () => ({ storyArgs, updateArgs }),
      template: '<FbdsRadio v-bind="storyArgs" @update:checked="(c) => updateArgs({ checked: c })"/>',
    };
  },
} satisfies Meta<typeof FbdsRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
