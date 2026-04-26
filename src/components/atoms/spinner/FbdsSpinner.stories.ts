import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { SpinnerSize } from '@/constants/atoms/fbds-spinner';

import FbdsSpinner from '@/components/atoms/spinner/FbdsSpinner.vue';

const meta = {
  title: 'FBDS/Atomes/Spinner',
  component: FbdsSpinner,
  tags: ['!dev'],
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(SpinnerSize),
    },
  },
  args: {
    size: SpinnerSize.Md,
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
