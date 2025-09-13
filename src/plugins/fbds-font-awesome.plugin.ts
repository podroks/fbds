import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { App } from 'vue';

import { Icon } from '@/constants/icon';

export function fbdsFontAwesomePlugin(app: App) {
  library.add(
    ...Object.entries(Icon)
      .filter(([key]) => !key.match(/^fac/))
      .map(([, value]) => value),
  );
  app.component('font-awesome-icon', FontAwesomeIcon);
}
