import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { useArgs } from 'storybook/internal/preview-api';

import { Icon } from '@/constants/icon';

import FbdsTabs from '@/components/atoms/tabs/FbdsTabs.vue';

const meta = {
  title: 'FBDS/Atomes/Tabs',
  component: FbdsTabs,
  tags: ['!dev'],
  argTypes: {
    selected: { control: 'text' },
    tabs: { control: 'object' },
    showContent: { control: 'boolean' },
  },
  args: {
    selected: 'tab1',
    tabs: [
      { id: 'tab1', label: 'Tab 1 peu trop long' },
      {
        id: 'tab2',
        label: 'Tab 2 beaucoup beaucoup beaucoup beaucoup trop long',
        icon: Icon.farSquare,
      },
      { id: 'tab3', icon: Icon.farSquare, tooltip: 'Tooltip sur Tab 3' },
      { id: 'tab4', label: 'Tab 4', disabled: true },
    ],
    showContent: false,
  },
  render: (_) => {
    const [storyArgs, updateArgs] = useArgs();
    return {
      components: { FbdsTabs },
      setup: () => ({ storyArgs, updateArgs }),
      template: `
        <FbdsTabs v-bind="storyArgs" @update:selected="(s) => updateArgs({ selected: s })">
          <template #tab(tab1)>Contenu du Tab 1</template>
          <template #tab(tab2)>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer semper est non sapien tristique, in tempus urna hendrerit.</template>
          <template #tab(tab3)>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer semper est non sapien tristique, in tempus urna hendrerit. Pellentesque sit amet urna nulla. Pellentesque consequat ipsum ut est auctor, nec lobortis lorem ullamcorper. Morbi viverra ante et varius ullamcorper.</template>
          <template #tab(tab4)>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer semper est non sapien tristique, in tempus urna hendrerit. Pellentesque sit amet urna nulla. Pellentesque consequat ipsum ut est auctor, nec lobortis lorem ullamcorper. Morbi viverra ante et varius ullamcorper. In ut rhoncus mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec venenatis, purus a rutrum venenatis, leo urna posuere sapien, sit amet porttitor lorem ipsum nec sapien.</template>
        </FbdsTabs>
      `,
    };
  },
} satisfies Meta<typeof FbdsTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
