function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const sanitizedHex = hex.startsWith('#') ? hex.slice(1) : hex;

  if (!/^[0-9A-Fa-f]{6}$/.test(sanitizedHex)) {
    console.warn(`Некорректный HEX-код: ${hex}`);
    return null;
  }

  const r = parseInt(sanitizedHex.substring(0, 2), 16);
  const g = parseInt(sanitizedHex.substring(2, 4), 16);
  const b = parseInt(sanitizedHex.substring(4, 6), 16);

  return { r, g, b };
}

function calculateLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function isLightBackground(hexBackgroundColor: string, threshold: number = 0.5): boolean {
  const rgb = hexToRgb(hexBackgroundColor);
  if (!rgb) {
    console.warn(
      `Не удалось определить RGB для HEX: ${hexBackgroundColor}. Предполагаем, что фон темный.`
    );
    return false;
  }

  const luminance = calculateLuminance(rgb.r, rgb.g, rgb.b);

  return luminance > threshold;
}

export function getAppropriateTextColor({
  hexBackgroundColor,
  lightTextColor,
  darkTextColor,
  threshold = 0.5,
}: {
  hexBackgroundColor: string;
  lightTextColor: string;
  darkTextColor: string;
  threshold?: number;
}): string {
  if (isLightBackground(hexBackgroundColor, threshold)) {
    return darkTextColor;
  }
  return lightTextColor;
}

export function calculateContrastRatio(hexColor1: string, hexColor2: string): number | null {
  const rgb1 = hexToRgb(hexColor1);
  const rgb2 = hexToRgb(hexColor2);

  if (!rgb1 || !rgb2) {
    return null;
  }

  const L1 = calculateLuminance(rgb1.r, rgb1.g, rgb1.b);
  const L2 = calculateLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);

  return (brighter + 0.05) / (darker + 0.05);
}

export function isValidHexColor(hex: string): boolean {
  if (typeof hex !== 'string') {
    return false;
  }

  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(hex);
}
