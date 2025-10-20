import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { useArgs } from 'storybook/internal/preview-api';
import { ref } from 'vue';

import { Icon } from '@/constants/icon';
import { Positioning } from '@/constants/positioning';
import { Theme } from '@/constants/theme';

import FbdsButton from '@/components/atoms/button/FbdsButton.vue';
import FbdsCheckbox from '@/components/atoms/checkbox/FbdsCheckbox.vue';
import FbdsRadio from '@/components/atoms/radio/FbdsRadio.vue';
import FbdsDropDownMenu, { type Option } from '@/components/molecules/dropDownMenu/FbdsDropDownMenu.vue';

const meta = {
  title: 'FBDS/Molecules/DropDownMenu',
  component: FbdsDropDownMenu,
  tags: ['!dev'],
  argTypes: {
    open: {
      control: 'boolean',
    },
    options: {
      control: 'object',
    },
    trigger: {
      control: false,
    },
    container: {
      control: false,
    },
    positioning: {
      control: 'select',
      options: Object.values(Positioning),
    },
    offset: {
      control: 'number',
    },
    containerOffset: {
      control: 'number',
    },
  },
  args: {
    open: false,
    options: [
      { label: 'Option 1', value: '1', icon: Icon.fasCircle },
      { label: 'Option 2', value: '2', icon: Icon.fasSquare },
      {
        label: 'Option 3',
        value: '3',
        icon: Icon.fasThumbsUp,
        children: [
          { label: 'Suboption 1', value: '3-1', icon: Icon.fasCircleCheck },
          { label: 'Suboption 2', value: '3-2', icon: Icon.fasCircleDot },
          { label: 'Suboption 3', value: '3-3', icon: Icon.fasSquareCheck },
          { label: 'Suboption 4', value: '3-4', icon: Icon.fasSquareMinus },
          { label: 'Suboption 5', value: '3-5', icon: Icon.fasPlus },
          { label: 'Suboption 6', value: '3-6' },
          { label: 'Suboption 7', value: '3-7' },
          { label: 'Suboption 8', value: '3-8' },
          {
            label: 'Suboption 9',
            value: '3-9',
            children: [
              { label: 'Suboption 1', value: '3-9-1', icon: Icon.fasCircleCheck },
              { label: 'Suboption 2', value: '3-9-2', icon: Icon.fasCircleDot },
              { label: 'Suboption 3', value: '3-9-3', icon: Icon.fasSquareCheck },
              { label: 'Suboption 4', value: '3-9-4', icon: Icon.fasSquareMinus },
              { label: 'Suboption 5', value: '3-9-5', icon: Icon.fasPlus },
              { label: 'Suboption 6', value: '3-9-6' },
              { label: 'Suboption 7', value: '3-9-7' },
              { label: 'Suboption 8', value: '3-9-8' },
              { label: 'Suboption 9', value: '3-9-9' },
            ],
          },
        ],
      },
      {
        label: 'Option 4',
        value: '4',
        icon: Icon.fasThumbsDown,
        children: [
          { label: 'Suboption 1', value: '4-1', icon: Icon.fasCircleCheck },
          { label: 'Suboption 2', value: '4-2', icon: Icon.fasCircleDot },
          { label: 'Suboption 3', value: '4-3', icon: Icon.fasSquareCheck },
          { label: 'Suboption 4', value: '4-4', icon: Icon.fasSquareMinus },
          { label: 'Suboption 5', value: '4-5', icon: Icon.fasPlus },
          { label: 'Suboption 6', value: '4-6' },
          { label: 'Suboption 7', value: '4-7' },
          { label: 'Suboption 8', value: '4-8' },
          { label: 'Suboption 9', value: '4-9' },
        ],
      },
    ],
    trigger: null,
    container: null,
    positioning: Positioning.Bottom,
    offset: 8,
    containerOffset: 8,
  },
  render: (_) => {
    const [storyArgs, updateArgs] = useArgs();
    return {
      components: { FbdsButton, FbdsDropDownMenu },
      setup() {
        const trigger = ref(null);
        return { storyArgs, updateArgs, Icon, trigger };
      },
      template: `
      <FbdsButton ref="trigger" :icon="Icon.fasEllipsisVertical" @click="() => updateArgs({ open: !storyArgs.open })"/>
      <FbdsDropDownMenu v-bind="storyArgs" :trigger @update:open="(open) => updateArgs({ open })"/>
    `,
    };
  },
} satisfies Meta<typeof FbdsDropDownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCheckbox: Story = {
  args: {
    options: [
      { label: 'Option 1', value: '1', icon: Icon.fasCircle },
      { label: 'Option 2', value: '2', icon: Icon.fasSquare },
      { label: 'Option 3', value: '3', icon: Icon.fasSquare },
      { label: 'Option 4', value: '4', icon: Icon.fasSquare },
    ],
  },
  render: (_) => {
    const [storyArgs, updateArgs] = useArgs();
    return {
      components: { FbdsButton, FbdsCheckbox, FbdsDropDownMenu },
      setup() {
        const selected = ref(['1', '3']);
        const trigger = ref(null);

        function toggleSelection(option: Option) {
          const index = selected.value.indexOf(option.value as string);
          if (index === -1) {
            selected.value.push(option.value as string);
          } else {
            selected.value.splice(index, 1);
          }
        }

        return { storyArgs, updateArgs, Icon, trigger, selected, toggleSelection };
      },
      template: `
      <FbdsButton ref="trigger" :icon="Icon.fasEllipsisVertical" @click="() => updateArgs({ open: !storyArgs.open })"/>
      <FbdsDropDownMenu v-bind="storyArgs" :trigger @update:open="(open) => updateArgs({ open })" @click="toggleSelection">
        <template #option="{ option }">
          <FbdsCheckbox :checked="selected.includes(option.value)" :label="option.label" :name="option.value" />
        </template>
      </FbdsDropDownMenu>
    `,
    };
  },
};

export const WithTheme: Story = {
  args: {
    options: [
      { label: 'Option 1', value: '1', icon: Icon.fasCircle, theme: Theme.BaseAlert },
      { label: 'Option 2', value: '2', icon: Icon.fasSquare, theme: Theme.BaseWarning },
      { label: 'Option 3', value: '3', icon: Icon.fasSquare, theme: Theme.BaseSuccess },
      { label: 'Option 4', value: '4', icon: Icon.fasSquare, theme: Theme.BasePrimary },
    ],
  },
  render: (_) => {
    const [storyArgs, updateArgs] = useArgs();
    return {
      components: { FbdsButton, FbdsDropDownMenu, FbdsRadio },
      setup() {
        const selected = ref<number | string | undefined>('1');
        const trigger = ref(null);

        function toggleSelection(option: Option) {
          selected.value = selected.value === option.value ? undefined : option.value;
        }

        return { storyArgs, updateArgs, Icon, trigger, selected, toggleSelection };
      },
      template: `
      <FbdsButton ref="trigger" :icon="Icon.fasEllipsisVertical" @click="() => updateArgs({ open: !storyArgs.open })"/>
      <FbdsDropDownMenu v-bind="storyArgs" :trigger @update:open="(open) => updateArgs({ open })" @click="toggleSelection">
        <template #option="{ option }">
          <FbdsRadio :checked="selected === option.value" :label="option.label" :name="option.value" :theme="option.theme" />
        </template>
      </FbdsDropDownMenu>
    `,
    };
  },
};
