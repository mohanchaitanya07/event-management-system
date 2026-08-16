import Profile from "../models/Profile.js";
import { isValidTimezone } from "./time.js";

export const validateEventPayload = async ({
  profiles,
  timezone,
  startAt,
  endAt,
}) => {
  if (!Array.isArray(profiles) || profiles.length === 0) {
    return "At least one profile is required";
  }

  if (!timezone || !startAt || !endAt) {
    return "Timezone, start and end are required";
  }

  if (!isValidTimezone(timezone)) {
    return "Invalid timezone";
  }

  const foundCount = await Profile.countDocuments({ _id: { $in: profiles } });

  if (foundCount !== profiles.length) {
    return "One or more profiles not found";
  }

  return null;
};
