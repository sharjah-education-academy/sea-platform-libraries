import * as numeral from "numeral";

export const numeralUtils = numeral.default;

export const getRandomInt = (min: number, max: number): number => {
  const lower = Math.ceil(min);
  const upper = Math.floor(max);
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};
