import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { Icon } from '@/constants/icon';

import FbdsEmptyState from '@/components/molecules/emptyState/FbdsEmptyState.vue';

const meta = {
  title: 'FBDS/Molecules/EmptyState',
  component: FbdsEmptyState,
  tags: ['!dev'],
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: Object.keys(Icon),
      mapping: Icon,
    },
    text: {
      control: 'text',
    },
    truncateAtLine: {
      control: 'number',
    },
    button: {
      control: 'object',
    },
  },
  args: {
    icon: undefined,
    text: 'Pas de données disponibles',
    truncateAtLine: 0,
    button: { label: 'Ajouter une donnée', icon: Icon.fasPlus },
  },
  render: (args) => ({
    components: { FbdsEmptyState },
    setup: () => ({ args }),
    template: '<FbdsEmptyState v-bind="args"/>',
  }),
} satisfies Meta<typeof FbdsEmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
