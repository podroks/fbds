import type { Theme } from '@/constants/theme';

export function getContrast(theme: Theme) {
  // Récupère la couleur CSS de la variable --color-fbds-${props.theme}
  const color = getComputedStyle(document.documentElement).getPropertyValue(`--color-fbds-${theme}`).trim();

  if (color.startsWith('#')) {
    // Nettoie le hexa
    let hex = color.replace('#', '');
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((x) => x + x)
        .join('');
    }
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    // YIQ formula
    return (r * 299 + g * 587 + b * 114) / 1000;
  }

  return 255; // valeur par défaut (blanc)
}
