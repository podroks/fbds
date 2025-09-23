import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { useArgs } from 'storybook/internal/preview-api';

import { Icon } from '@/constants/icon';
import { Theme } from '@/constants/theme';

import FbdsSwitch from '@/components/atoms/switch/FbdsSwitch.vue';

const meta = {
  title: 'FBDS/Atomes/Switch',
  component: FbdsSwitch,
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
    theme: {
      control: 'select',
      options: Object.values(Theme).filter((t) => t !== Theme.BaseDisable),
    },
    icon: {
      control: 'select',
      options: Object.keys(Icon),
      mapping: Icon,
    },
    border: {
      control: 'boolean',
    },
    themeUnchecked: {
      control: 'select',
      options: Object.values(Theme).filter((t) => t !== Theme.BaseDisable),
    },
    iconUnchecked: {
      control: 'select',
      options: Object.keys(Icon),
      mapping: Icon,
    },
    borderUnchecked: {
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
    label: 'libellé Switch',
    name: 'select',
    theme: Theme.BasePrimary,
    icon: undefined,
    border: false,
    themeUnchecked: undefined,
    iconUnchecked: undefined,
    borderUnchecked: false,
    disabled: false,
    tooltip: 'Tooltip',
    tooltipOptions: {},
  },
  render: (_) => {
    const [storyArgs, updateArgs] = useArgs();
    return {
      components: { FbdsSwitch },
      setup: () => ({ storyArgs, updateArgs }),
      template: '<FbdsSwitch v-bind="storyArgs" @update:checked="(c) => updateArgs({ checked: c })"/>',
    };
  },
} satisfies Meta<typeof FbdsSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
