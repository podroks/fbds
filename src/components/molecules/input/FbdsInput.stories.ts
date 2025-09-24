import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { StatusTheme } from '@/constants/theme';

import FbdsInput from '@/components/molecules/input/FbdsInput.vue';

const meta = {
  title: 'FBDS/Molecules/Input',
  component: FbdsInput,
  tags: ['!dev'],
  argTypes: {
    title: {
      control: 'text',
    },
    status: {
      control: 'object',
    },
  },
  args: {
    title: "Titre de l'input",
    status: { label: 'Libellé du statut', value: 'Valeur du statut', theme: StatusTheme.Neutral },
  },
  render: (args) => ({
    components: { FbdsInput },
    setup: () => ({ args }),
    template: `
      <FbdsInput v-bind="args">
        <div class="h-10 w-full bg-fbds-container-accent-1 rounded-md flex items-center justify-center fbds-font-label-large text-fbds-on-container-accent-1">
          Composant de saisie ici
        </div>
      </FbdsInput>
    `,
  }),
} satisfies Meta<typeof FbdsInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
