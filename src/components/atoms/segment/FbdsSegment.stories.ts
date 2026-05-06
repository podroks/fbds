import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { useArgs } from 'storybook/internal/preview-api';

import { Icon } from '@/constants/icon';

import FbdsSegment from '@/components/atoms/segment/FbdsSegment.vue';

const meta = {
  title: 'FBDS/Atomes/Segment',
  component: FbdsSegment,
  tags: ['!dev'],
  argTypes: {
    segments: { control: 'object' },
    multiple: { control: 'boolean' },
    required: { control: 'boolean' },
    selected: { control: 'object' },
  },
  args: {
    segments: [
      { id: '1', icon: Icon.GridView },
      { id: '2', label: 'Option 2', icon: Icon.ListView },
      { id: '3', label: 'Option 3', disabled: true },
    ],
    multiple: false,
    required: false,
    selected: [],
  },
  render: () => {
    const [storyArgs, updateArgs] = useArgs();
    return {
      components: { FbdsSegment },
      setup: () => ({ storyArgs, updateArgs }),
      template: '<FbdsSegment v-bind="storyArgs" @update:selected="(v) => updateArgs({ selected: v })"/>',
    };
  },
} satisfies Meta<typeof FbdsSegment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
