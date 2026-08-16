import { apiGet, apiPost, apiPatch } from "./client.js";

export const fetchEvents = (profileId) =>
  apiGet(profileId ? `/events?profileId=${profileId}` : "/events");

export const createEvent = (payload) => apiPost("/events", payload);

export const updateEvent = (id, payload) => apiPatch(`/events/${id}`, payload);

export const fetchEventLogs = (id) => apiGet(`/events/${id}/logs`);
