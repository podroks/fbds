import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { useArgs } from 'storybook/internal/preview-api';

import { Contrast } from '@/constants/atoms/fbds-button';
import { Icon } from '@/constants/icon';
import { StatusTheme, Theme } from '@/constants/theme';

import FbdsButton from '@/components/atoms/button/FbdsButton.vue';
import FbdsInputNumber from '@/components/molecules/inputNumber/FbdsInputNumber.vue';

const meta = {
  title: 'FBDS/Molecules/InputNumber',
  component: FbdsInputNumber,
  tags: ['!dev'],
  argTypes: {
    value: {
      control: 'number',
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
    step: {
      control: 'number',
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
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
    value: undefined,
    id: 'number-input-id',
    title: "Titre de l'inputNumber",
    placeholder: 'Saisir un nombre ici ...',
    status: { label: 'Libellé du statut', value: 'Valeur du statut', theme: StatusTheme.Neutral },
    step: 1,
    min: undefined,
    max: undefined,
    disabled: false,
    prependIcon: undefined,
    prependIconTheme: undefined,
  },
  render: (_) => {
    const [storyArgs, updateArgs] = useArgs();
    return {
      components: { FbdsInputNumber, FbdsButton },
      setup: () => ({ storyArgs, Icon, Contrast, updateArgs }),
      template: `
        <FbdsInputNumber v-bind="storyArgs" @update:value="(v) => updateArgs({ value: v })" />
      `,
    };
  },
} satisfies Meta<typeof FbdsInputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
