import { computed, ref, type Ref, watch } from 'vue';

import { Positioning, PrimaryPositioning, SecondaryPositioning } from '@/constants/positioning';

import { useBoundingRectObserver } from '@/composables/useBoundingRectObserver';

const flipMap: Record<PrimaryPositioning, PrimaryPositioning> = {
  [PrimaryPositioning.Top]: PrimaryPositioning.Bottom,
  [PrimaryPositioning.Bottom]: PrimaryPositioning.Top,
  [PrimaryPositioning.Left]: PrimaryPositioning.Right,
  [PrimaryPositioning.Right]: PrimaryPositioning.Left,
} as Record<PrimaryPositioning, PrimaryPositioning>;

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
  function startWith(pos: Positioning, prefix: SecondaryPositioning) {
    return pos.startsWith(prefix);
  }

  function endWith(pos: Positioning, suffix: SecondaryPositioning) {
    return pos.includes('-') && pos.endsWith(suffix);
  }

  function parsePositioning(position: Positioning): [PrimaryPositioning, SecondaryPositioning | null] {
    const primary = position.split('-')[0] as PrimaryPositioning;
    const secondary = position.includes('-') ? (position.split('-')[1] as SecondaryPositioning) : null;
    return [primary, secondary];
  }

  function concatPositioning(primary: PrimaryPositioning, secondary: SecondaryPositioning | null): Positioning {
    return (secondary ? `${primary}-${secondary}` : primary) as Positioning;
  }

  function flipPrimary(position: Positioning): Positioning {
    const [primary, secondary] = parsePositioning(position);
    const flipped = flipMap[primary];
    return concatPositioning(flipped, secondary);
  }

  function flipSecondary(position: Positioning): Positioning {
    const [primary, secondary] = parsePositioning(position);
    if (secondary && secondary !== SecondaryPositioning.Full) {
      const flipped = flipMap[secondary];
      return concatPositioning(primary, flipped);
    }
    return position;
  }

  const adjustedPositioning = computed<Positioning>(() => {
    if (!triggerRect.value || !floatingRect.value || !containerRect.value) {
      return positioning.value;
    }

    // === Container bounds ajustés ===
    const offset = containerOffset.value;
    const cLeft = Math.max(containerRect.value.left, 0) + offset;
    const cRight = Math.min(containerRect.value.right, window.innerWidth) - offset;
    const cTop = Math.max(containerRect.value.top, 0) + offset;
    const cBottom = Math.min(containerRect.value.bottom, window.innerHeight) - offset;

    // === Dimensions des éléments ===
    const { x: tX, y: tY, width: tW, height: tH } = triggerRect.value;
    const fW = Math.max(floatingEl.value?.scrollWidth ?? 0, floatingRect.value.width);
    const fH = floatingEl.value?.scrollHeight ?? floatingRect.value.height;
    const triggerGap = triggerOffset.value;

    // === Position initiale ===
    let [primary, secondary] = parsePositioning(positioning.value);

    // === Ajustement du secondaire selon la visibilité dans le conteneur ===
    const isVert = (p: PrimaryPositioning | SecondaryPositioning) => p === Positioning.Top || p === Positioning.Bottom;
    const isHoriz = (p: PrimaryPositioning | SecondaryPositioning) => p === Positioning.Left || p === Positioning.Right;

    if (cBottom < tY && isVert(primary)) primary = PrimaryPositioning.Top;
    else if (cTop > tY + tH && isVert(primary)) primary = PrimaryPositioning.Bottom;
    else if (cRight < tX && isHoriz(primary)) primary = PrimaryPositioning.Left;
    else if (cLeft > tX + tW && isHoriz(primary)) primary = PrimaryPositioning.Right;

    if (secondary) {
      if (cBottom < tY && isVert(secondary)) secondary = SecondaryPositioning.Bottom;
      else if (cTop > tY + tH && isVert(secondary)) secondary = SecondaryPositioning.Top;
      else if (cRight < tX && isHoriz(secondary)) secondary = SecondaryPositioning.Right;
      else if (cLeft > tX + tW && isHoriz(secondary)) secondary = SecondaryPositioning.Left;
    }

    const tmpPositioning = concatPositioning(primary, secondary);

    // === Fonction d’évaluation de fit (0 à 1) ===
    function fits(position: Positioning): [number, number] {
      // Position de base centrée
      let top = tY + tH / 2 - fH / 2;
      let left = tX + tW / 2 - fW / 2;

      // Ajustement selon la direction primaire
      if (startWith(position, Positioning.Top)) top = tY - fH - triggerGap;
      else if (startWith(position, Positioning.Bottom)) top = tY + tH + triggerGap;
      else if (startWith(position, Positioning.Left)) left = tX - fW - triggerGap;
      else if (startWith(position, Positioning.Right)) left = tX + tW + triggerGap;

      // Ajustement selon l’alignement secondaire
      if (endWith(position, Positioning.Left)) left = tX;
      else if (endWith(position, Positioning.Right)) left = tX + tW - fW;
      else if (endWith(position, Positioning.Top)) top = tY;
      else if (endWith(position, Positioning.Bottom)) top = tY + tH - fH;

      // Calcul de la partie visible
      const visibleHeight = Math.max(0, Math.min(top + fH, cBottom) - Math.max(top, cTop));
      const visibleWidth = Math.max(0, Math.min(left + fW, cRight) - Math.max(left, cLeft));

      const fitV = visibleHeight / fH;
      const fitH = visibleWidth / fW;

      const fitPrimary = startWith(position, Positioning.Top) || startWith(position, Positioning.Bottom) ? fitV : fitH;
      const fitSecondary =
        endWith(position, Positioning.Top) || endWith(position, Positioning.Bottom)
          ? fitV
          : endWith(position, Positioning.Left) || endWith(position, Positioning.Right)
            ? fitH
            : 1;

      return [fitPrimary, fitSecondary];
    }

    // === Ajustements dynamiques ===
    const [fitPrimary, fitSecondary] = fits(tmpPositioning);

    // Flip primaire si nécessaire
    if (fitPrimary < 1) {
      const flipped = flipPrimary(tmpPositioning);
      if (flipped !== tmpPositioning) {
        const [newFit] = fits(flipped);
        if (newFit > fitPrimary) [primary] = parsePositioning(flipped);
      }
    }

    // Flip secondaire si nécessaire
    if (fitSecondary < 1) {
      const flipped = flipSecondary(tmpPositioning);
      if (flipped !== tmpPositioning) {
        const [, newFit] = fits(flipped);
        if (newFit > fitSecondary) [, secondary] = parsePositioning(flipped);
      }
    }

    return concatPositioning(primary, secondary);
  });

  const maxWidth = computed<`${number}px` | 'unset'>(() => {
    if (!triggerRect.value || !containerRect.value) {
      return 'unset';
    }

    const { x: cX, width: cW } = containerRect.value;
    const { x: tX, width: tW } = triggerRect.value;

    if (
      startWith(adjustedPositioning.value, Positioning.Top) ||
      startWith(adjustedPositioning.value, Positioning.Bottom)
    ) {
      if (endWith(adjustedPositioning.value, Positioning.Left)) {
        return `${Math.max(0, Math.min(cW - containerOffset.value * 2, cW + cX - tX - containerOffset.value))}px`;
      }
      if (endWith(adjustedPositioning.value, Positioning.Right)) {
        return `${Math.max(0, Math.min(cW - containerOffset.value * 2, tX + tW - cX - containerOffset.value))}px`;
      }
      return `${Math.max(0, cW - 2 * containerOffset.value)}px`;
    }

    if (startWith(adjustedPositioning.value, Positioning.Left)) {
      return `${Math.max(0, Math.min(cW, tX - cX) - 2 * containerOffset.value)}px`;
    }

    if (startWith(adjustedPositioning.value, Positioning.Right)) {
      return `${Math.max(0, Math.min(cW, cX + cW - tX - tW) - 2 * containerOffset.value)}px`;
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
      startWith(adjustedPositioning.value, Positioning.Left) ||
      startWith(adjustedPositioning.value, Positioning.Right)
    ) {
      if (endWith(adjustedPositioning.value, Positioning.Top)) {
        return `${Math.max(0, Math.min(cH - containerOffset.value * 2, cH + cY - tY - containerOffset.value))}px`;
      }
      if (endWith(adjustedPositioning.value, Positioning.Bottom)) {
        return `${Math.max(0, Math.min(cH - containerOffset.value * 2, tY + tH - cY - containerOffset.value))}px`;
      }
      return `${Math.max(0, cH - 2 * containerOffset.value)}px`;
    }

    if (startWith(adjustedPositioning.value, Positioning.Top)) {
      return `${Math.max(0, Math.min(cH, tY - cY) - 2 * containerOffset.value)}px`;
    }

    if (startWith(adjustedPositioning.value, Positioning.Bottom)) {
      return `${Math.max(0, Math.min(cH, cY + cH - tY - tH) - 2 * containerOffset.value)}px`;
    }

    return 'unset';
  });

  const width = computed<`${number}px` | 'unset'>(() => {
    if (!triggerRect.value || !floatingRect.value || !containerRect.value) {
      return 'unset';
    }

    if (
      endWith(adjustedPositioning.value, SecondaryPositioning.Full) &&
      (startWith(adjustedPositioning.value, Positioning.Top) ||
        startWith(adjustedPositioning.value, Positioning.Bottom))
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
      endWith(adjustedPositioning.value, SecondaryPositioning.Full) &&
      (startWith(adjustedPositioning.value, Positioning.Left) ||
        startWith(adjustedPositioning.value, Positioning.Right))
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
    if (startWith(adjustedPositioning.value, Positioning.Top)) {
      t = triggerRect.value.y - floatingRect.value.height - triggerOffset.value;
    } else if (startWith(adjustedPositioning.value, Positioning.Bottom)) {
      t = triggerRect.value.y + triggerRect.value.height + triggerOffset.value;
    } else if (
      endWith(adjustedPositioning.value, Positioning.Top) ||
      endWith(adjustedPositioning.value, SecondaryPositioning.Full)
    ) {
      t = triggerRect.value.y;
    } else if (endWith(adjustedPositioning.value, Positioning.Bottom)) {
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
    if (startWith(adjustedPositioning.value, Positioning.Left)) {
      l = triggerRect.value.x - floatingRect.value.width - triggerOffset.value;
    } else if (startWith(adjustedPositioning.value, Positioning.Right)) {
      l = triggerRect.value.x + triggerRect.value.width + triggerOffset.value;
    } else if (
      endWith(adjustedPositioning.value, Positioning.Left) ||
      endWith(adjustedPositioning.value, SecondaryPositioning.Full)
    ) {
      l = triggerRect.value.x;
    } else if (endWith(adjustedPositioning.value, Positioning.Right)) {
      l = triggerRect.value.x + triggerRect.value.width - floatingRect.value.width;
    } else {
      l = triggerRect.value.x + triggerRect.value.width / 2 - floatingRect.value.width / 2;
    }

    const min = containerRect.value.left + containerOffset.value;
    const max = containerRect.value.right - floatingRect.value.width - containerOffset.value;
    l = Math.max(min, Math.min(l, max));
    return `${l}px`;
  });

  return {
    top,
    left,
    height,
    width,
    maxHeight,
    maxWidth,
    triggerEl,
    updateAllRect,
  };
}
