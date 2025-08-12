import type { Meta, StoryObj } from '@storybook/vue3-vite';

import FbdsColor from '@/docs/color/FbdsColor.vue';

const meta = {
  title: 'Base/Couleurs',
  component: FbdsColor,
  tags: ['!dev'],
} satisfies Meta<typeof FbdsColor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Color: Story = {};
