import { useState } from "react";
import { useAppStore } from "../store/useAppStore.js";
import { TIMEZONES, toInputValue } from "../utils/time.js";
import Modal from "./Modal.jsx";
import ProfileMultiSelect from "./ProfileMultiSelect.jsx";

function EditEventModal({ event, onClose }) {
  const editEvent = useAppStore((state) => state.editEvent);

  const start = toInputValue(event.startAt, event.timezone);
  const end = toInputValue(event.endAt, event.timezone);

  const [form, setForm] = useState({
    profileIds: event.profiles.map((p) => (typeof p === "string" ? p : p._id)),
    timezone: event.timezone,
    startDate: start.date,
    startTime: start.time,
    endDate: end.date,
    endTime: end.time,
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const updateField = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleProfile = (id) =>
    setForm((prev) => ({
      ...prev,
      profileIds: prev.profileIds.includes(id)
        ? prev.profileIds.filter((p) => p !== id)
        : [...prev.profileIds, id],
    }));

  const handleSave = async () => {
    setError("");

    if (form.profileIds.length === 0) {
      return setError("Select at least one profile");
    }

    setSaving(true);

    try {
      await editEvent(event._id, {
        profiles: form.profileIds,
        timezone: form.timezone,
        startAt: `${form.startDate} ${form.startTime}`,
        endAt: `${form.endDate} ${form.endTime}`,
      });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title="Edit Event" onClose={onClose}>
      <label className="field-label">Profiles</label>
      <ProfileMultiSelect
        selectedIds={form.profileIds}
        onToggle={toggleProfile}
      />

      <label className="field-label">Timezone</label>
      <select
        value={form.timezone}
        onChange={(e) => updateField("timezone", e.target.value)}
      >
        {TIMEZONES.map((tz) => (
          <option key={tz.value} value={tz.value}>
            {tz.label}
          </option>
        ))}
      </select>

      <label className="field-label">Start Date &amp; Time</label>
      <div className="datetime-row">
        <input
          type="date"
          value={form.startDate}
          onChange={(e) => updateField("startDate", e.target.value)}
        />
        <input
          type="time"
          value={form.startTime}
          onChange={(e) => updateField("startTime", e.target.value)}
        />
      </div>

      <label className="field-label">End Date &amp; Time</label>
      <div className="datetime-row">
        <input
          type="date"
          value={form.endDate}
          min={form.startDate || undefined}
          onChange={(e) => updateField("endDate", e.target.value)}
        />
        <input
          type="time"
          value={form.endTime}
          onChange={(e) => updateField("endTime", e.target.value)}
        />
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="modal-actions">
        <button className="btn-ghost" onClick={onClose}>
          Cancel
        </button>
        <button className="btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Update Event"}
        </button>
      </div>
    </Modal>
  );
}

export default EditEventModal;
