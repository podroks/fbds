import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { useArgs } from 'storybook/internal/preview-api';

import { Contrast } from '@/constants/atoms/fbds-button';
import { Icon } from '@/constants/icon';
import { StatusTheme, Theme } from '@/constants/theme';

import FbdsButton from '@/components/atoms/button/FbdsButton.vue';
import FbdsInputText from '@/components/molecules/inputText/FbdsInputText.vue';

const meta = {
  title: 'FBDS/Molecules/InputText',
  component: FbdsInputText,
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
    appendIcon: {
      control: 'select',
      options: Object.keys(Icon),
      mapping: Icon,
    },
    appendIconTheme: {
      control: 'select',
      options: Object.values(Theme).filter((t) => t !== Theme.BaseDisable),
    },
  },
  args: {
    value: '',
    id: 'text-input-id',
    title: "Titre de l'inputText",
    placeholder: 'Saisir du texte ici ...',
    status: { label: 'Libellé du statut', value: 'Valeur du statut', theme: StatusTheme.Neutral },
    disabled: false,
    prependIcon: undefined,
    prependIconTheme: undefined,
    appendIcon: undefined,
    appendIconTheme: undefined,
  },
  render: (_) => {
    const [storyArgs, updateArgs] = useArgs();
    return {
      components: { FbdsInputText, FbdsButton },
      setup: () => ({ storyArgs, Icon, Contrast, updateArgs }),
      template: `
        <FbdsInputText v-bind="storyArgs" @update:value="(v) => updateArgs({ value: v })">
          <template #prepend>
            <FbdsButton
              class="rounded-r-none"
              :icon="Icon.farSquare"
              :contrast="Contrast.Tertiary"
            />
          </template>
          <template #append>
            <FbdsButton
              class="rounded-l-none"
              :icon="Icon.farSquare"
              :contrast="Contrast.Tertiary"
            />
          </template>
        </FbdsInputText>
      `,
    };
  },
} satisfies Meta<typeof FbdsInputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
