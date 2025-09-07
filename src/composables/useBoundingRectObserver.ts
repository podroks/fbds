import { onUnmounted, type Ref } from 'vue';

export function useBoundingRectObserver() {
  const observer: ResizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const el = entry.target as HTMLElement;
      const rectRef = rectMap.get(el);
      if (rectRef) {
        rectRef.value = el.getBoundingClientRect();
      }
    }
  });
  // Map interne pour retrouver facilement le rectRef lié à un élément
  const rectMap = new Map<HTMLElement, Ref<DOMRect | null>>();

  onUnmounted(() => {
    observer?.disconnect();
    rectMap.clear();
  });

  function observe(el: HTMLElement | null, rectRef: Ref<DOMRect | null>) {
    if (el && observer) {
      rectMap.set(el, rectRef);
      observer.observe(el);
      rectRef.value = el.getBoundingClientRect(); // mesure initiale
    }
  }

  function unobserve(el: HTMLElement | null, rectRef: Ref<DOMRect | null>) {
    if (el && observer) {
      observer.unobserve(el);
      rectMap.delete(el);
      rectRef.value = null;
    }
  }

  return { observe, unobserve };
}
