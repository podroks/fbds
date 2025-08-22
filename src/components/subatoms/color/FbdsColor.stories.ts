import type { Meta, StoryObj } from '@storybook/vue3-vite';

import FbdsColor from '@/components/subatoms/color/FbdsColor.vue';

const meta = {
  title: 'FBDS/Subatomes/Couleurs',
  component: FbdsColor,
  tags: ['!dev'],
} satisfies Meta<typeof FbdsColor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Color: Story = {};
