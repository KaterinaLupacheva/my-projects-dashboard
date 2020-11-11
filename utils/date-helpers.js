export const timestampToDate = (timestamp) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(timestamp).toLocaleDateString("en-US", options);
};
