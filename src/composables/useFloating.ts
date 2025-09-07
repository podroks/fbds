import { computed, ref, type Ref, watch } from 'vue';

import { Positioning, PositioningFull } from '@/constants/positioning';

import { useBoundingRectObserver } from '@/composables/useBoundingRectObserver';

export function useFloating(
  floating: Ref<HTMLElement | { el: HTMLElement | null } | string | null>,
  trigger: Ref<HTMLElement | { el: HTMLElement | null } | string | null>,
  positioning: Ref<Positioning>,
  options: {
    triggerOffset?: Ref<number>;
    container?: Ref<HTMLElement | { el: HTMLElement | null } | string | null>;
    containerOffset?: Ref<number>;
  } = {},
) {
  const { observe, unobserve } = useBoundingRectObserver();

  const triggerOffset = computed<number>(() => options.triggerOffset?.value ?? 8);
  const containerOffset = computed<number>(() => options.containerOffset?.value ?? 8);

  const floatingEl = computed<HTMLElement | null>(() => getEl(floating.value));
  const triggerEl = computed<HTMLElement | null>(() => getEl(trigger.value));
  const containerEl = computed<HTMLElement>(() => getEl(options.container?.value) ?? document.body);
  function getEl(source: HTMLElement | { el: HTMLElement | null } | string | null | undefined): HTMLElement | null {
    let el: HTMLElement | null;
    if (source instanceof HTMLElement) {
      el = source;
    } else if (typeof source === 'string') {
      el = document.querySelector(source) || document.body;
    } else {
      el = source?.el ?? null;
    }
    return el;
  }

  /* ----------------------------- Rect definition ---------------------------- */
  const floatingRect = ref<DOMRect | null>(null);
  const triggerRect = ref<DOMRect | null>(null);
  const containerRect = ref<DOMRect | null>(null);

  watch(
    () => floatingEl.value,
    (el, _, onCleanup) => {
      observe(el, floatingRect);
      onCleanup(() => {
        unobserve(el, floatingRect);
      });
    },
    { immediate: true },
  );
  watch(
    () => triggerEl.value,
    (el, _, onCleanup) => {
      observe(el, triggerRect);
      onCleanup(() => {
        unobserve(el, triggerRect);
      });
    },
    { immediate: true },
  );
  watch(
    () => containerEl.value,
    (el, _, onCleanup) => {
      observe(el, containerRect);
      onCleanup(() => {
        unobserve(el, containerRect);
      });
    },
    { immediate: true },
  );

  function updateAllRect() {
    floatingRect.value = floatingEl.value?.getBoundingClientRect() ?? null;
    triggerRect.value = triggerEl.value?.getBoundingClientRect() ?? null;
    containerRect.value = containerEl.value?.getBoundingClientRect() ?? null;
  }

  /* ----------------------------- Positioning ----------------------------- */
  const adjustedPositioning = computed(() => {
    if (!triggerRect.value || !floatingRect.value || !containerRect.value) {
      return positioning.value;
    }

    const cLeft = Math.max(containerRect.value.left, 0) + containerOffset.value;
    const cRight = Math.min(containerRect.value.right, window.innerWidth) - containerOffset.value;
    const cTop = Math.max(containerRect.value.top, 0) + containerOffset.value;
    const cBottom = Math.min(containerRect.value.bottom, window.innerHeight) - containerOffset.value;
    const { x: tX, y: tY, width: tW, height: tH } = triggerRect.value;
    const fW = floatingEl.value?.scrollWidth ?? floatingRect.value.width;
    const fH = floatingEl.value?.scrollHeight ?? floatingRect.value.height;

    function fits(position: Positioning) {
      let top = 0,
        left = 0;
      if (position.startsWith(Positioning.Top)) {
        top = tY - fH - triggerOffset.value;
        left = tX + tW / 2 - fW / 2;
      } else if (position.startsWith(Positioning.Bottom)) {
        top = tY + tH + triggerOffset.value;
        left = tX + tW / 2 - fW / 2;
      } else if (position.startsWith(Positioning.Left)) {
        top = tY + tH / 2 - fH / 2;
        left = tX - fW - triggerOffset.value;
      } else if (position.startsWith(Positioning.Right)) {
        top = tY + tH / 2 - fH / 2;
        left = tX + tW + triggerOffset.value;
      } else {
        // Default: center
        top = tY + tH / 2 - fH / 2;
        left = tX + tW / 2 - fW / 2;
      }

      if (position.startsWith(Positioning.Top) || position.startsWith(Positioning.Bottom)) {
        // Retourne le pourcentage de fit vertical (0 à 1)
        const visibleTop = Math.max(top, cTop);
        const visibleBottom = Math.min(top + fH, cBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        return visibleHeight / fH;
      }
      // Retourne le pourcentage de fit horizontal (0 à 1)
      const visibleLeft = Math.max(left, cLeft);
      const visibleRight = Math.min(left + fW, cRight);
      const visibleWidth = Math.max(0, visibleRight - visibleLeft);
      return visibleWidth / fW;
    }

    const subPoisitionning = positioning.value.includes('-') ? `-${positioning.value.split('-')[1]}` : '';
    // Container plus haut que le trigger
    if (
      cBottom < tY &&
      (positioning.value.startsWith(Positioning.Top) || positioning.value.startsWith(Positioning.Bottom))
    ) {
      return Positioning.Top + subPoisitionning;
    }

    // Container plus bas que le trigger
    if (
      cTop > tY + tH &&
      (positioning.value.startsWith(Positioning.Top) || positioning.value.startsWith(Positioning.Bottom))
    ) {
      return Positioning.Bottom + subPoisitionning;
    }

    // Container plus a gauche que le trigger
    if (
      cRight < tX &&
      (positioning.value.startsWith(Positioning.Left) || positioning.value.startsWith(Positioning.Right))
    ) {
      return Positioning.Left + subPoisitionning;
    }

    // Container plus a droite que le trigger
    if (
      cLeft > tX + tW &&
      (positioning.value.startsWith(Positioning.Left) || positioning.value.startsWith(Positioning.Right))
    ) {
      return Positioning.Right + subPoisitionning;
    }

    const defaultFit = fits(positioning.value);
    if (defaultFit === 1) {
      return positioning.value;
    }

    const flipMap: Record<Positioning, Positioning> = {
      [Positioning.Top]: Positioning.Bottom,
      [Positioning.TopFull]: Positioning.BottomFull,
      [Positioning.TopLeft]: Positioning.BottomLeft,
      [Positioning.TopRight]: Positioning.BottomRight,
      [Positioning.Bottom]: Positioning.Top,
      [Positioning.BottomFull]: Positioning.TopFull,
      [Positioning.BottomLeft]: Positioning.TopLeft,
      [Positioning.BottomRight]: Positioning.TopRight,
      [Positioning.Left]: Positioning.Right,
      [Positioning.LeftFull]: Positioning.RightFull,
      [Positioning.LeftTop]: Positioning.RightTop,
      [Positioning.LeftBottom]: Positioning.RightBottom,
      [Positioning.Right]: Positioning.Left,
      [Positioning.RightFull]: Positioning.LeftFull,
      [Positioning.RightTop]: Positioning.LeftTop,
      [Positioning.RightBottom]: Positioning.LeftBottom,
    } as Record<string, Positioning>;

    const flipped = flipMap[positioning.value as Positioning];
    if (flipped) {
      const adjustedFit = fits(flipped);
      if (adjustedFit > defaultFit) {
        return flipped;
      }
    }

    // Fallback: return original
    return positioning.value;
  });

  const maxWidth = computed<`${number}px` | 'unset'>(() => {
    if (!triggerRect.value || !containerRect.value) {
      return 'unset';
    }

    const { x: cX, width: cW } = containerRect.value;
    const { x: tX, width: tW } = triggerRect.value;

    if (
      adjustedPositioning.value.startsWith(Positioning.Top) ||
      adjustedPositioning.value.startsWith(Positioning.Bottom)
    ) {
      if (adjustedPositioning.value.endsWith(Positioning.Left)) {
        return `${cW - tX - containerOffset.value}px`;
      }
      if (adjustedPositioning.value.endsWith(Positioning.Right)) {
        return `${tX + tW - cX - containerOffset.value}px`;
      }
      return `${cW - 2 * containerOffset.value}px`;
    }

    if (adjustedPositioning.value.startsWith(Positioning.Left)) {
      return `${Math.min(cW, tX - cX) - 2 * containerOffset.value}px`;
    }

    if (adjustedPositioning.value.startsWith(Positioning.Right)) {
      return `${Math.min(cW, cX + cW - tX - tW) - 2 * containerOffset.value}px`;
    }

    return 'unset';
  });

  const maxHeight = computed<`${number}px` | 'unset'>(() => {
    if (!triggerRect.value || !containerRect.value) {
      return 'unset';
    }

    const { y: cY, height: cH } = containerRect.value;
    const { y: tY, height: tH } = triggerRect.value;

    if (
      adjustedPositioning.value.startsWith(Positioning.Left) ||
      adjustedPositioning.value.startsWith(Positioning.Right)
    ) {
      if (adjustedPositioning.value.endsWith(Positioning.Top)) {
        return `${cH - tY - containerOffset.value}px`;
      }
      if (adjustedPositioning.value.endsWith(Positioning.Bottom)) {
        return `${tY + tH - cY - containerOffset.value}px`;
      }
      return `${cH - 2 * containerOffset.value}px`;
    }

    if (adjustedPositioning.value.startsWith(Positioning.Top)) {
      return `${Math.min(cH, tY - cY) - 2 * containerOffset.value}px`;
    }

    if (adjustedPositioning.value.startsWith(Positioning.Bottom)) {
      return `${Math.min(cH, cY + cH - tY - tH) - 2 * containerOffset.value}px`;
    }

    return 'unset';
  });

  const width = computed<`${number}px` | 'unset'>(() => {
    if (!triggerRect.value || !floatingRect.value || !containerRect.value) {
      return 'unset';
    }

    if (
      adjustedPositioning.value.endsWith(PositioningFull) &&
      (adjustedPositioning.value.startsWith(Positioning.Top) ||
        adjustedPositioning.value.startsWith(Positioning.Bottom))
    ) {
      return `${triggerRect.value.width}px`;
    }
    return 'unset';
  });

  const height = computed<`${number}px` | 'unset'>(() => {
    if (!triggerRect.value || !floatingRect.value || !containerRect.value) {
      return 'unset';
    }

    if (
      adjustedPositioning.value.endsWith(PositioningFull) &&
      (adjustedPositioning.value.startsWith(Positioning.Left) ||
        adjustedPositioning.value.startsWith(Positioning.Right))
    ) {
      return `${triggerRect.value.height}px`;
    }
    return 'unset';
  });

  const top = computed<`${number}px`>(() => {
    if (!triggerRect.value || !floatingRect.value || !containerRect.value) {
      return '0px';
    }

    let t = 0;
    // Top positioning
    if (adjustedPositioning.value.startsWith(Positioning.Top)) {
      t = triggerRect.value.y - floatingRect.value.height - triggerOffset.value;
    } else if (adjustedPositioning.value.startsWith(Positioning.Bottom)) {
      t = triggerRect.value.y + triggerRect.value.height + triggerOffset.value;
    } else if (
      adjustedPositioning.value.endsWith(Positioning.Top) ||
      adjustedPositioning.value.endsWith(PositioningFull)
    ) {
      t = triggerRect.value.y;
    } else if (adjustedPositioning.value.endsWith(Positioning.Bottom)) {
      t = triggerRect.value.y + triggerRect.value.height - floatingRect.value.height;
    } else {
      t = triggerRect.value.y + triggerRect.value.height / 2 - floatingRect.value.height / 2;
    }

    const min = Math.max(containerRect.value.top, 0) + containerOffset.value;
    const max =
      Math.min(containerRect.value.bottom, window.innerHeight) - floatingRect.value.height - containerOffset.value;
    t = Math.max(min, Math.min(t, max));
    return `${t}px`;
  });

  const left = computed<`${number}px`>(() => {
    if (!triggerRect.value || !floatingRect.value || !containerRect.value) {
      return '0px';
    }

    let l = 0;
    if (adjustedPositioning.value.startsWith(Positioning.Left)) {
      l = triggerRect.value.x - floatingRect.value.width - triggerOffset.value;
    } else if (adjustedPositioning.value.startsWith(Positioning.Right)) {
      l = triggerRect.value.x + triggerRect.value.width + triggerOffset.value;
    } else if (
      adjustedPositioning.value.endsWith(Positioning.Left) ||
      adjustedPositioning.value.endsWith(PositioningFull)
    ) {
      l = triggerRect.value.x;
    } else if (adjustedPositioning.value.endsWith(Positioning.Right)) {
      l = triggerRect.value.x + triggerRect.value.width - floatingRect.value.width;
    } else {
      l = triggerRect.value.x + triggerRect.value.width / 2 - floatingRect.value.width / 2;
    }

    const min = containerRect.value.left + containerOffset.value;
    const max = containerRect.value.right - floatingRect.value.width - containerOffset.value;
    l = Math.max(min, Math.min(l, max));
    return `${l}px`;
  });

  return { top, left, height, width, maxHeight, maxWidth, floatingEl, triggerEl, containerEl, updateAllRect };
}
