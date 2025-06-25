export const convertToRGP = (hex: string) => {
  const R = parseInt(hex.slice(1, 3), 16);
  const G = parseInt(hex.slice(3, 5), 16);
  const B = parseInt(hex.slice(5, 7), 16);

  return { R, G, B };
};

export const isColorLight = (hex: string) => {
  const { R, G, B } = convertToRGP(hex);

  const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;

  return luminance > 0.5;
};
