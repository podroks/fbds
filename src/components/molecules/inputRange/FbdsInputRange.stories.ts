import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { useArgs } from 'storybook/internal/preview-api';

import { Contrast } from '@/constants/atoms/fbds-button';
import { Icon } from '@/constants/icon';
import { StatusTheme, Theme } from '@/constants/theme';

import FbdsButton from '@/components/atoms/button/FbdsButton.vue';
import FbdsInputRange from '@/components/molecules/inputRange/FbdsInputRange.vue';

const meta = {
  title: 'FBDS/Molecules/InputRange',
  component: FbdsInputRange,
  tags: ['!dev'],
  argTypes: {
    value: {
      control: 'number',
    },
    title: {
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
    showTooltip: {
      control: 'boolean',
    },
    showSteps: {
      control: 'boolean',
    },
    emitOnChange: {
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
    value: undefined,
    title: "Titre de l'inputRange",
    status: { label: 'Libellé du statut', value: 'Valeur du statut', theme: StatusTheme.Neutral },
    step: 1,
    min: 10,
    max: 20,
    showTooltip: false,
    showSteps: false,
    emitOnChange: false,
    disabled: false,
    prependIcon: undefined,
    prependIconTheme: undefined,
    appendIcon: undefined,
    appendIconTheme: undefined,
  },
  render: (_) => {
    const [storyArgs, updateArgs] = useArgs();
    return {
      components: { FbdsInputRange, FbdsButton },
      setup: () => ({ storyArgs, Icon, Contrast, updateArgs }),
      template: `
        <FbdsInputRange v-bind="storyArgs" @update:value="(v) => { console.log(v); updateArgs({ value: v }) }" />
      `,
    };
  },
} satisfies Meta<typeof FbdsInputRange>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
