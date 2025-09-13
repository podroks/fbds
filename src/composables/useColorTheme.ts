import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

export function useColorTheme() {
  const theme = ref<string | null>(null);

  const isDark = computed<boolean>(() => theme.value === 'dark');

  function getThemeFromHtml() {
    const html = document.documentElement;
    return html.getAttribute('theme');
  }

  let observer: MutationObserver | null = null;

  onMounted(() => {
    theme.value = getThemeFromHtml();
    const html = document.documentElement;
    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'theme') {
          theme.value = getThemeFromHtml();
        }
      }
    });
    observer.observe(html, { attributes: true, attributeFilter: ['theme'] });
  });

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  });

  return {
    isDark,
    theme,
    refreshTheme: () => {
      theme.value = getThemeFromHtml();
    },
  };
}
