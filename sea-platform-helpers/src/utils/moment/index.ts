import moment from "moment";
import momentTZ from "moment-timezone";

export const formatDate = (data: Date | string, format = "YYYY-MM-DD") => {
  return moment.utc(data).format(format).toString();
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

export default moment;
