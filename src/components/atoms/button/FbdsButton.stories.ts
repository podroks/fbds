import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { ButtonSize, ButtonVariant } from '@/constants/atoms/fbds-button';
import { Icon } from '@/constants/icon';

import FbdsButton from '@/components/atoms/button/FbdsButton.vue';

const meta = {
  title: 'FBDS/Atomes/Button',
  component: FbdsButton,
  tags: ['!dev'],
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(ButtonVariant),
    },
    size: {
      control: 'select',
      options: Object.values(ButtonSize),
    },
    label: {
      control: 'text',
    },
    icon: {
      control: 'select',
      options: Object.keys(Icon),
      mapping: Icon,
    },
    disabled: {
      control: 'boolean',
    },
    href: {
      control: 'text',
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
    },
    to: {
      control: 'text',
    },
    tooltip: {
      control: 'text',
    },
    tooltipOptions: {
      control: 'object',
    },
  },
  args: {
    variant: ButtonVariant.Primary,
    size: ButtonSize.Md,
    label: 'Button',
    icon: undefined,
    disabled: false,
    href: undefined,
    target: '_blank',
    to: undefined,
    tooltip: 'Tooltip',
    tooltipOptions: {},
  },
  render: (args) => ({
    components: { FbdsButton },
    setup: () => ({ args }),
    template: '<FbdsButton v-bind="args"/>',
  }),
} satisfies Meta<typeof FbdsButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
