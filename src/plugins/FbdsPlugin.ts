import type { App } from 'vue';

import { fbdsFontAwesomePlugin } from '@/plugins/FbdsFontAwesomePlugin';

import { toKebabCase } from '@/utils/cases';

import { components } from '@/components';

export default {
  install(app: App) {
    fbdsFontAwesomePlugin(app);
    for (const component of components) {
      if (component.name) {
        const kebabName = toKebabCase(component.name);
        app.component(kebabName, component);
      }
    }
  },
};
