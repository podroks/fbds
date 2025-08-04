import type { App } from 'vue'
import { components } from '../components'
import { toKebabCase } from '@/utils/cases'

export default {
  install(app: App) {
    for (const component of components) {
      if (component.name) {
        const kebabName = toKebabCase(component.name)
        app.component(kebabName, component)
      }
    }
  },
}
