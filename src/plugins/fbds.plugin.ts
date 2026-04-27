import type { App } from 'vue';

import { toKebabCase } from '@/utils/case.util';

import { components } from '@/components';

export default {
  install(app: App) {
    for (const component of components) {
      if (component.name) {
        const kebabName = toKebabCase(component.name);
        app.component(kebabName, component);
      }
    }
  },
};
