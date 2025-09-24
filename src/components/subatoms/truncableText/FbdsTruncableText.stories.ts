import type { Meta, StoryObj } from '@storybook/vue3-vite';

import FbdsTruncableText from '@/components/subatoms/truncableText/FbdsTruncableText.vue';

const meta = {
  title: 'FBDS/Subatomes/TruncableText',
  component: FbdsTruncableText,
  tags: ['!dev'],
  argTypes: {
    text: {
      control: 'text',
    },
    truncateAtLine: {
      control: 'number',
    },
    tooltipOptions: {
      control: 'object',
    },
  },
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    truncateAtLine: 2,
    tooltipOptions: {},
  },
  render: (args) => ({
    components: { FbdsTruncableText },
    setup: () => ({ args }),
    template: '<FbdsTruncableText v-bind="args"/>',
  }),
} satisfies Meta<typeof FbdsTruncableText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
