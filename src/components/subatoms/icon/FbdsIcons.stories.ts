import type { Meta, StoryObj } from '@storybook/vue3-vite';

import FbdsIcons from '@/components/subatoms/icon/FbdsIcons.vue';

const meta = {
  title: 'Subatomes/Icônes',
  component: FbdsIcons,
  tags: ['!dev'],
} satisfies Meta<typeof FbdsIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icons: Story = {};
