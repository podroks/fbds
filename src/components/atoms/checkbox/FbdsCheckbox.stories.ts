import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { useArgs } from 'storybook/internal/preview-api';

import FbdsCheckbox from '@/components/atoms/checkbox/FbdsCheckbox.vue';

const meta = {
  title: 'FBDS/Atomes/Checkbox',
  component: FbdsCheckbox,
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
    undetermined: {
      control: 'boolean',
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
    label: 'libellé checkbox',
    name: 'select',
    undetermined: false,
    disabled: false,
    tooltip: 'Tooltip',
    tooltipOptions: {},
  },
  render: (_) => {
    const [storyArgs, updateArgs] = useArgs();
    return {
      components: { FbdsCheckbox },
      setup: () => ({ storyArgs, updateArgs }),
      template: '<FbdsCheckbox v-bind="storyArgs" @update:checked="(c) => updateArgs({ checked: c })"/>',
    };
  },
} satisfies Meta<typeof FbdsCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
