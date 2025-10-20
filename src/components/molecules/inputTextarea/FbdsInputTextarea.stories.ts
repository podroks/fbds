import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { useArgs } from 'storybook/internal/preview-api';

import { Contrast } from '@/constants/atoms/fbds-button';
import { Icon } from '@/constants/icon';
import { StatusTheme, Theme } from '@/constants/theme';

import FbdsButton from '@/components/atoms/button/FbdsButton.vue';
import FbdsInputTextarea from '@/components/molecules/inputTextarea/FbdsInputTextarea.vue';

const meta = {
  title: 'FBDS/Molecules/InputTextarea',
  component: FbdsInputTextarea,
  tags: ['!dev'],
  argTypes: {
    value: {
      control: 'text',
    },
    id: {
      control: 'text',
    },
    title: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    status: {
      control: 'object',
    },
    rows: {
      control: 'number',
    },
    resizable: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    prependIcon: {
      control: 'select',
      options: Object.keys(Icon),
      mapping: Icon,
    },
    prependIconTheme: {
      control: 'select',
      options: Object.values(Theme).filter((t) => t !== Theme.BaseDisable),
    },
  },
  args: {
    value: '',
    id: 'text-input-id',
    title: "Titre de l'inputTextarea",
    placeholder: 'Saisir du texte ici ...',
    status: { label: 'Libellé du statut', value: 'Valeur du statut', theme: StatusTheme.Neutral },
    rows: 1,
    resizable: true,
    disabled: false,
    prependIcon: undefined,
    prependIconTheme: undefined,
  },
  render: (_) => {
    const [storyArgs, updateArgs] = useArgs();
    return {
      components: { FbdsInputTextarea, FbdsButton },
      setup: () => ({ storyArgs, Icon, Contrast, updateArgs }),
      template: `
        <FbdsInputTextarea v-bind="storyArgs" @update:value="(v) => updateArgs({ value: v })">

        </FbdsInputTextarea>
      `,
    };
  },
} satisfies Meta<typeof FbdsInputTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
