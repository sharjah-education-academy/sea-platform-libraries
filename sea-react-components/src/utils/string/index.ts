export const phoneRegExp = /^\+?[1-9]\d{1,3}\d{6,14}$/;

export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const isPhoneNumber = (str: string) => {
  return phoneRegExp.test(str);
};
export const isEmail = (str: string) => {
  return emailRegex.test(str);
};
