import { useState } from "react";
import {
  formatInZone,
  formatTimeInZone,
  formatFullInZone,
} from "../utils/time.js";
import EditEventModal from "./EditEventModal.jsx";
import LogsModal from "./LogsModal.jsx";

function EventCard({ event, viewTimezone, profileNameById }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showLogs, setShowLogs] = useState(false);

  const names = event.profiles
    .map((profile) =>
      typeof profile === "string" ? profileNameById.get(profile) : profile.name,
    )
    .filter(Boolean)
    .join(", ");

  return (
    <article className="event-card">
      <p className="event-profiles">{names}</p>

      <div className="event-time">
        <span className="event-label">Start</span>
        <span>{formatInZone(event.startAt, viewTimezone)}</span>
        <span className="muted">
          {formatTimeInZone(event.startAt, viewTimezone)}
        </span>
      </div>

      <div className="event-time">
        <span className="event-label">End</span>
        <span>{formatInZone(event.endAt, viewTimezone)}</span>
        <span className="muted">
          {formatTimeInZone(event.endAt, viewTimezone)}
        </span>
      </div>

      <div className="event-meta">
        <span>Created: {formatFullInZone(event.createdAt, viewTimezone)}</span>
        <span>Updated: {formatFullInZone(event.updatedAt, viewTimezone)}</span>
      </div>

      <div className="event-actions">
        <button className="btn-ghost" onClick={() => setShowEdit(true)}>
          Edit
        </button>
        <button className="btn-ghost" onClick={() => setShowLogs(true)}>
          View Logs
        </button>
      </div>

      {showEdit && (
        <EditEventModal event={event} onClose={() => setShowEdit(false)} />
      )}

      {showLogs && (
        <LogsModal
          eventId={event._id}
          viewTimezone={viewTimezone}
          onClose={() => setShowLogs(false)}
        />
      )}
    </article>
  );
}

export default EventCard;
