import Button from '../components/FbButton.vue'

export default {
  title: 'Components/Button',
  component: Button,
}

const Template = (args: any) => ({
  components: { Button },
  setup() {
    return { args }
  },
  template: '<Button v-bind="args">Button</Button>',
})

export const Primary = Template.bind({})
Primary.args = {
  type: 'primary',
  disabled: false,
}
