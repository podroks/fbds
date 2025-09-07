import '../src/assets/styles/color.css';
import './manager.css';

import { addons } from 'storybook/manager-api';
import { darkTheme, lightTheme } from './FbdsTheme';

addons.setConfig({
  theme: lightTheme,
});

function onUrlChange(callback: (url: URL) => void) {
  const wrap = (type: "pushState" | "replaceState") => {
    const orig = history[type];
    return function (this: History, ...args: any[]) {
      const result = orig.apply(this, args as any);
      callback(new URL(window.location.href));
      return result;
    };
  };

  history.pushState = wrap("pushState");
  history.replaceState = wrap("replaceState");

  window.addEventListener("popstate", () => callback(new URL(window.location.href)));
}

onUrlChange((url) => {
  let themeToUse;
  const globals = url.searchParams.get("globals")
  const theme = globals?.split(';').find(g => g.startsWith('theme:'))?.replace('theme:', '');
  if (theme) {
    setItem("theme", theme);
    themeToUse = theme;
  } else {
    const oldTheme = getItem<string>("theme");
    themeToUse = oldTheme;
    if (oldTheme) {
      url.searchParams.set('globals', `${globals}${globals ? ';' : ''}theme:${oldTheme}`);
      window.history.replaceState({}, '', url.toString());
    }
  }

  if (!themeToUse) {
    if (typeof window !== 'undefined' && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      themeToUse = 'dark'
    } else {
      themeToUse = 'light'
    }
  }

  setTheme(themeToUse)
});

function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}
function getItem<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
}

let timeoutId: ReturnType<typeof setTimeout> | undefined;

function setTheme (theme) {
  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    const documentElement = window.document.documentElement;
    documentElement.setAttribute('theme', theme);

    addons.setConfig({
      theme: theme === 'dark' ? darkTheme : lightTheme,
    });
  }, 200);
}

function updateLogo() {
  const logo = parent.document.querySelector<HTMLImageElement>('img[alt="Fbds - Storybook"]');
  if (!logo) return;

  const theme = parent.document.documentElement.getAttribute('theme') || 'light';
  logo.src = theme === 'dark' ? '/fbds-dark.svg' : '/fbds-light.svg';
}

// Au chargement
updateLogo();

// Observer les changements de l’attribut theme
new MutationObserver(updateLogo).observe(parent.document.documentElement, { attributes: true, attributeFilter: ['theme'] });
