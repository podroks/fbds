import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import { Icon } from '@/constants/icon';
import { Positioning } from '@/constants/positioning';

import FbdsTooltip from '@/components/atoms/tooltip/FbdsTooltip.vue'; // TODO: order subatomes => atomes . Ou pas .
import FbdsIcon from '@/components/subatoms/icon/FbdsIcon.vue';

const meta = {
  title: 'FBDS/Atomes/Tooltip',
  component: FbdsTooltip,
  tags: ['!dev'],
  argTypes: {
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
    trigger: null,
    container: null,
    positioning: Positioning.Top,
    offset: 8,
    containerOffset: 8,
  },
  render: (args) => ({
    components: { FbdsIcon, FbdsTooltip },
    setup() {
      const trigger = ref(null);
      return { args, Icon, trigger };
    },
    template: `
      <div class="flex items-center justify-center">
        <div ref="trigger" class="inline-block p-2 bg-fbds-base-primary cursor-pointer rounded-sm">
          <FbdsIcon :icon="Icon.fasHandPointer" :size="6" class="text-fbds-on-base-primary"/>
        </div>
      </div>
      <FbdsTooltip v-bind="args" :trigger="trigger">
        Tooltip ❤️
      </FbdsTooltip>
    `,
  }),
} satisfies Meta<typeof FbdsTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
