import moment from "moment";

export const formatData = (data: Date | string, format = "YYYY-MM-DD") => {
  return moment.utc(data).format(format).toString();
};
