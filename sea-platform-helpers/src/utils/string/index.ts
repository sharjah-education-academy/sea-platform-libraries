const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const normalizeString = (str: string | undefined | null) => {
  if (str) return str.trim().toLowerCase();
  return null;
};

export const generateRandomString = (length: number = 6) => {
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
};

export const phoneRegExp = /^\+?[1-9]\d{1,3}\d{6,14}$/;

export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const colorRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;

export const isPhoneNumber = (str: string) => {
  return phoneRegExp.test(str);
};
export const isEmail = (str: string) => {
  return emailRegex.test(str);
};

export const isColor = (str: string) => {
  return colorRegex.test(str);
};

export const getInitials = (name: string) => {
  if (!name) return "";

  const words = name.trim().split(/\s+/); // split by spaces
  const initials = words.map((word) => word[0]?.toUpperCase()).filter(Boolean);

  return (initials[0] || "") + (initials[1] || "");
};
