import { create } from "zustand";
import * as profileApi from "../api/profiles.js";
import * as eventApi from "../api/events.js";

export const useAppStore = create((set, get) => ({
  profiles: [],
  currentProfileId: null,
  viewTimezone: "America/New_York",
  events: [],
  loading: false,
  error: null,

  loadProfiles: async () => {
    try {
      const profiles = await profileApi.fetchProfiles();
      const { currentProfileId } = get();

      set({
        profiles,
        currentProfileId: currentProfileId || profiles[0]?._id || null,
      });
    } catch (error) {
      set({ error: error.message });
    }
  },

  addProfile: async (name) => {
    const profile = await profileApi.createProfile(name);
    set((state) => ({ profiles: [...state.profiles, profile] }));
    return profile;
  },

  setCurrentProfile: (id) => {
    const profile = get().profiles.find((p) => p._id === id);

    set({
      currentProfileId: id,
      viewTimezone: profile?.timezone || "America/New_York",
    });

    get().loadEvents();
  },

  setViewTimezone: async (timezone) => {
    const { currentProfileId } = get();
    set({ viewTimezone: timezone });

    if (currentProfileId) {
      await profileApi.updateProfileTimezone(currentProfileId, timezone);
    }
  },

  loadEvents: async () => {
    const { currentProfileId } = get();
    if (!currentProfileId) return;

    set({ loading: true });

    try {
      const events = await eventApi.fetchEvents(currentProfileId);
      set({ events, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addEvent: async (payload) => {
    await eventApi.createEvent(payload);
    await get().loadEvents();
  },

  editEvent: async (id, payload) => {
    await eventApi.updateEvent(id, payload);
    await get().loadEvents();
  },
}));
