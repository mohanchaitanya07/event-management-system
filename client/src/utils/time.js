import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const TIMEZONES = [
  { value: "Asia/Kolkata", label: "India (IST)" },
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "Asia/Dubai", label: "Dubai (GST)" },
  { value: "Asia/Singapore", label: "Singapore (SGT)" },
  { value: "Australia/Sydney", label: "Sydney (AEST)" },
  { value: "UTC", label: "UTC" },
];

export const formatInZone = (utcDate, zone) =>
  dayjs(utcDate).tz(zone).format("MMM D, YYYY");

export const formatTimeInZone = (utcDate, zone) =>
  dayjs(utcDate).tz(zone).format("h:mm A");

export const formatFullInZone = (utcDate, zone) =>
  dayjs(utcDate).tz(zone).format("MMM D, YYYY [at] hh:mm A");

export const toInputValue = (utcDate, zone) => ({
  date: dayjs(utcDate).tz(zone).format("YYYY-MM-DD"),
  time: dayjs(utcDate).tz(zone).format("HH:mm"),
});
