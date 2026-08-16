import { apiGet, apiPost, apiPatch } from "./client.js";

export const fetchProfiles = () => apiGet("/profiles");

export const createProfile = (name) => apiPost("/profiles", { name });

export const updateProfileTimezone = (id, timezone) =>
  apiPatch(`/profiles/${id}`, { timezone });
