import { useEffect, useState } from "react";
import { fetchEventLogs } from "../api/events.js";
import { formatFullInZone } from "../utils/time.js";
import Modal from "./Modal.jsx";

const FIELD_LABELS = {
  profiles: "Profiles",
  timezone: "Timezone",
  startAt: "Start date/time",
  endAt: "End date/time",
};

function LogsModal({ eventId, viewTimezone, onClose }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventLogs(eventId)
      .then(setLogs)
      .catch(() => setLogs([]))
      .finally(() => setLoading(false));
  }, [eventId]);

  const describe = (change) => {
    const label = FIELD_LABELS[change.field] || change.field;

    if (change.field === "startAt" || change.field === "endAt") {
      return `${label} changed to ${formatFullInZone(change.to, viewTimezone)}`;
    }

    if (change.field === "profiles") {
      return `${label} updated (${change.to.length} selected)`;
    }

    return `${label} changed to ${change.to}`;
  };

  return (
    <Modal title="Event Update History" onClose={onClose}>
      {loading && <p className="muted center">Loading...</p>}

      {!loading && logs.length === 0 && (
        <p className="muted center">No update history yet</p>
      )}

      {!loading &&
        logs.map((log) => (
          <div key={log._id} className="log-entry">
            <p className="log-time">
              {formatFullInZone(log.createdAt, viewTimezone)}
            </p>
            {log.changes.map((change, index) => (
              <p key={index} className="log-change">
                {describe(change)}
              </p>
            ))}
          </div>
        ))}
    </Modal>
  );
}

export default LogsModal;
