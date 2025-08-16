import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { App } from 'vue';

import { Icons } from '@/constants/icons';

export function fbdsFontAwesomePlugin(app: App) {
  library.add(...Object.entries(Icons).filter(([key]) => !key.match(/^fac/)).map(([, value]) => value));
  app.component('font-awesome-icon', FontAwesomeIcon);
}
