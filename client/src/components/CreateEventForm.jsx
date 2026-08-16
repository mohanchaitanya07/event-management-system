import { useState } from "react";
import { useAppStore } from "../store/useAppStore.js";
import { TIMEZONES } from "../utils/time.js";
import ProfileMultiSelect from "./ProfileMultiSelect.jsx";

const emptyForm = {
  profileIds: [],
  timezone: "America/New_York",
  startDate: "",
  startTime: "09:00",
  endDate: "",
  endTime: "09:00",
};

function CreateEventForm() {
  const addEvent = useAppStore((state) => state.addEvent);

  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleProfile = (id) => {
    setForm((prev) => ({
      ...prev,
      profileIds: prev.profileIds.includes(id)
        ? prev.profileIds.filter((p) => p !== id)
        : [...prev.profileIds, id],
    }));
  };

  const handleSubmit = async () => {
    setError("");

    if (form.profileIds.length === 0) {
      return setError("Select at least one profile");
    }

    if (!form.startDate || !form.endDate) {
      return setError("Pick a start and end date");
    }

    setSaving(true);

    try {
      await addEvent({
        profiles: form.profileIds,
        timezone: form.timezone,
        startAt: `${form.startDate} ${form.startTime}`,
        endAt: `${form.endDate} ${form.endTime}`,
      });
      setForm(emptyForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="card">
      <h2 className="card-title">Create Event</h2>

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

      <button
        className="btn-primary btn-block"
        onClick={handleSubmit}
        disabled={saving}
      >
        {saving ? "Creating..." : "+ Create Event"}
      </button>
    </section>
  );
}

export default CreateEventForm;
