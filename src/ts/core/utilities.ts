
/**
 * Gets the constructor of the given value.
 * For primitive values, it returns their wrapper object constructors (Number, String, Boolean).
 * For object types, it returns their constructor directly.
 * @param {T} value - The value to get the constructor of.
 * @returns {EHS.Setting.Type<T> | null} The constructor of the value, or null if it cannot be determined.
 */
export function getConstructor<T>(value: T): EHS.Setting.Type<T> | null {
  if (value === null || value === undefined) {return null;}
  switch (typeof value) {
    case "string": return String as EHS.Setting.Type<T>;
    case "number": return Number as EHS.Setting.Type<T>;
    case "boolean": return Boolean as EHS.Setting.Type<T>;
    case "object": return (Array.isArray(value) ? Array : value.constructor) as EHS.Setting.Type<T>;
    default: return null;
  }
}

export enum InputType {
  Button = "Button",
  Select = "Select",
  Text = "Text",
  Number = "Number",
  File = "File",
  Color = "Color",
  Checkbox = "Checkbox"
}

export function changeBrightness(color: number, factor: number) {
  // Convert RGB to HSB
  const red = (color >> 16) & 0xFF;
  const green = (color >> 8) & 0xFF; // Extract green component from color
  const blue = color & 0xFF; // Extract blue component from color
  const {h, s, b: initialBrightness} = rgbToHsb(red, green, blue); // Convert RGB to HSB
  // Adjust brightness
  const adjustedBrightness = Math.min(Math.max(factor, 0), 1); // Ensure brightness stays within the range 0 to 1
  // Convert HSB back to RGB
  const {r, g, b: newBlue} = hsbToRgb(h, s, adjustedBrightness); // Convert HSB to RGB
  return (r << 16) | (g << 8) | newBlue;
}

// Helper function to convert RGB to HSB
function rgbToHsb(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0; // Initialize h with a default value of 0
  let s;
  const l = (max + min) / 2;
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d) + (g < b ? 6 : 0);
        break;
      case g:
        h = ((b - r) / d) + 2;
        break;
      case b:
        h = ((r - g) / d) + 4;
        break;
    }
    h /= 6;
  }
  return {h, s, b: l};
}
// Helper function to convert HSB back to RGB
function hsbToRgb(h: number, s: number, b: number) {
  let r = 0; let g = 0; let blue = 0;
  const i = Math.floor(h * 6);
  const f = (h * 6) - i;
  const p = b * (1 - s);
  const q = b * (1 - (f * s));
  const t = b * (1 - ((1 - f) * s));
  switch (i % 6) {
    case 0: r = b; g = t; blue = p; break;
    case 1: r = q; g = b; blue = p; break;
    case 2: r = p; g = b; blue = t; break;
    case 3: r = p; g = q; blue = b; break;
    case 4: r = t; g = p; blue = b; break;
    case 5: r = b; g = p; blue = q; break;
  }
  return {r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(blue * 255)};
}