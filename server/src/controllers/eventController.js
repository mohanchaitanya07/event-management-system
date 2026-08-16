import Event from "../models/Event.js";
import { toUtcDate } from "../utils/time.js";
import { validateEventPayload } from "../utils/validateEventPayload.js";

// get events
export const getEvents = async (req, res, next) => {
  try {
    const { profileId } = req.query;
    const filter = profileId ? { profiles: profileId } : {};

    const events = await Event.find(filter)
      .populate("profiles", "name timezone")
      .sort({ startAt: 1 });

    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

//create new event
export const createEvent = async (req, res, next) => {
  try {
    const { profiles, timezone, startAt, endAt } = req.body;

    const validationError = await validateEventPayload(req.body);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const startUtc = toUtcDate(startAt, timezone);
    const endUtc = toUtcDate(endAt, timezone);

    if (endUtc <= startUtc) {
      return res
        .status(400)
        .json({ message: "End time must be after start time" });
    }

    const event = await Event.create({
      profiles,
      timezone,
      startAt: startUtc,
      endAt: endUtc,
    });

    await event.populate("profiles", "name timezone");
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

//update event
export const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { profiles, timezone, startAt, endAt } = req.body;

    const validationError = await validateEventPayload(req.body);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event Not found" });
    }

    const startUtc = toUtcDate(startAt, timezone);
    const endUtc = toUtcDate(endAt, timezone);

    if (endUtc <= startUtc) {
      return res
        .status(400)
        .json({ message: "End time must be after start time" });
    }

    event.profiles = profiles;
    event.timezone = timezone;
    event.startAt = startUtc;
    event.endAt = endUtc;

    await event.save();
    await event.populate("profiles", "name timezone");

    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};
