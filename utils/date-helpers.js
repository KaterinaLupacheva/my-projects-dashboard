import moment from "moment";

export const timestampToDate = (timestamp) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(timestamp).toLocaleDateString("en-US", options);
};

export const daysRange = (startDate, endDate) => {
  let dates = [];
  let start = moment(startDate);
  const end = moment(endDate);

  while (start.isSameOrBefore(end)) {
    dates.push(start.format("DD-MM-YYYY"));
    start.add(1, "days");
  }
  return dates;
};
