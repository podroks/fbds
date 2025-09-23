import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { useArgs } from 'storybook/internal/preview-api';

import { Icon } from '@/constants/icon';

import FbdsSegmented from '@/components/atoms/segmented/FbdsSegmented.vue';

const meta = {
  title: 'FBDS/Atomes/Segmented',
  component: FbdsSegmented,
  tags: ['!dev'],
  argTypes: {
    segments: {
      control: 'object',
    },
    selected: {
      control: 'text',
    },
  },
  args: {
    segments: [
      { id: '1', icon: Icon.farCircle },
      { id: '2', label: 'Segment 2' },
      { id: '3', label: 'Segment 3', icon: Icon.farCircle, disabled: true },
    ],
    selected: undefined,
  },
  render: (_) => {
    const [storyArgs, updateArgs] = useArgs();
    return {
      components: { FbdsSegmented },
      setup: () => ({ storyArgs, updateArgs }),
      template: '<FbdsSegmented v-bind="storyArgs" @update:selected="(c) => updateArgs({ selected: c })"/>',
    };
  },
} satisfies Meta<typeof FbdsSegmented>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
