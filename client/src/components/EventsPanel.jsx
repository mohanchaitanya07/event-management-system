import { useMemo } from "react";
import { useAppStore } from "../store/useAppStore.js";
import { TIMEZONES } from "../utils/time.js";
import EventCard from "./EventCard.jsx";

function EventsPanel() {
  const events = useAppStore((state) => state.events);
  const profiles = useAppStore((state) => state.profiles);
  const viewTimezone = useAppStore((state) => state.viewTimezone);
  const setViewTimezone = useAppStore((state) => state.setViewTimezone);
  const loading = useAppStore((state) => state.loading);

  const profileNameById = useMemo(() => {
    const map = new Map();
    profiles.forEach((profile) => map.set(profile._id, profile.name));
    return map;
  }, [profiles]);

  return (
    <section className="card">
      <h2 className="card-title">Events</h2>

      <label className="field-label">View in Timezone</label>
      <select
        value={viewTimezone}
        onChange={(e) => setViewTimezone(e.target.value)}
      >
        {TIMEZONES.map((tz) => (
          <option key={tz.value} value={tz.value}>
            {tz.label}
          </option>
        ))}
      </select>

      <div className="event-list">
        {loading && <p className="muted center">Loading...</p>}

        {!loading && events.length === 0 && (
          <p className="muted center">No events found</p>
        )}

        {!loading &&
          events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              viewTimezone={viewTimezone}
              profileNameById={profileNameById}
            />
          ))}
      </div>
    </section>
  );
}

export default EventsPanel;
