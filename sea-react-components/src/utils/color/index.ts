export const convertToRGP = (hex: string) => {
  hex = hex.replace(/^#/, "");

  let R = parseInt(hex.substring(0, 2), 16);
  let G = parseInt(hex.substring(2, 4), 16);
  let B = parseInt(hex.substring(4, 6), 16);

  // Convert to sRGB
  const normalize = (value: number) => {
    const channel = value / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);
  };

  R = normalize(R);
  G = normalize(G);
  B = normalize(B);

  return { R, G, B };
};

export const isColorLight = (hex: string) => {
  const { R, G, B } = convertToRGP(hex);

  const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;

  return luminance > 0.5;
};
