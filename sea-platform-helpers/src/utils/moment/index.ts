import moment from "moment";
import * as momentTZ from "moment-timezone";
export { momentTZ };

export const formatDate = (data: Date | string, format = "YYYY-MM-DD") => {
  return moment(data).format(format).toString();
};

export const formatDateAsLabel = (date: string | Date) => {
  const now = moment();
  const inputDate = moment(date);

  const diffInMinutes = now.diff(inputDate, "minutes");
  const diffInHours = now.diff(inputDate, "hours");

  if (diffInMinutes < 1) {
    return "just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else {
    return inputDate.tz(moment.tz.guess()).format("DD MMM YYYY HH:mm a");
  }
};

export const getCurrentYear = () => moment().format("YYYY").toString();

export const getDaysCountBetweenTwoDays = (date1: string, date2: string) =>
  moment(date2).diff(moment(date1), "days");

export const getDaysCountTillNow = (pastDate: string) =>
  getDaysCountBetweenTwoDays(moment.utc().format("YYYY-MM-DD"), pastDate);

export const getAge = (birthdate: string) =>
  moment().diff(moment(birthdate), "years");

export const getStartOfDay = (date?: Date | string): Date => {
  return moment(date).startOf("day").toDate();
};

export const getEndOfDay = (date?: Date | string): Date => {
  return moment(date).endOf("day").toDate();
};

export const getNextPeriod = (
  date: string | Date,
  period: "day" | "week" | "month"
) => moment(date).add(1, period).toDate();

export const getPreviousPeriod = (
  date: string | Date,
  period: "day" | "week" | "month"
) => moment(date).subtract(1, period).toDate();

export default moment;

export const isDateInQuarterAndYear = (
  date: Date,
  quarter: number,
  year: number
): boolean => {
  if (!date) return false;
  const d = new Date(date);
  const q = Math.floor(d.getMonth() / 3) + 1;
  return d.getFullYear() === year && q === quarter;
};

export const getEndOfQuarter = (year: number, quarter: number): Date => {
  const endMonth = quarter * 3 - 1; // Q1: Feb, Q2: May, Q3: Aug, Q4: Nov
  const date = new Date(year, endMonth + 1, 0); // Last day of that month
  date.setHours(23, 59, 59, 999); // End of day
  return date;
};
