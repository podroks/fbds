import type { Meta, StoryFn } from '@storybook/vue3';

import Button from '@/components/FbButton.vue';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};
export default meta;

const Template: StoryFn<typeof Button> = args => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: '<Button v-bind="args">Button</Button>',
});

export const Primary = Template.bind({});
Primary.args = {};
