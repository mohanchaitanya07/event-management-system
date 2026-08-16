import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const toUtcDate = (dateTimeString, timezoneName) => {
  return dayjs.tz(dateTimeString, timezoneName).toDate();
};

export const isValidTimezone = (timezoneName) => {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezoneName });
    return true;
  } catch (error) {
    return false;
  }
};
