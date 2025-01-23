export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatReadingTime = (minutes) => {
  if (minutes < 1) {
    return "Less than a minute read";
  } else if (minutes === 1) {
    return "1 minute read";
  } else {
    return `${minutes} minutes read`;
  }
};
