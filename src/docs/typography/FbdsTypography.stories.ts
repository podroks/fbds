import type { Meta, StoryObj } from '@storybook/vue3-vite';

import FbdsTypography from '@/docs/typography/FbdsTypography.vue';

const meta = {
  title: 'Base/Typographies',
  component: FbdsTypography,
  tags: ['!dev'],
} satisfies Meta<typeof FbdsTypography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Typography: Story = {};
