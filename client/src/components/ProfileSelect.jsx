import { useState, useRef, useEffect, useMemo } from "react";
import { useAppStore } from "../store/useAppStore.js";

function ProfileSelect() {
  const profiles = useAppStore((state) => state.profiles);
  const currentProfileId = useAppStore((state) => state.currentProfileId);
  const setCurrentProfile = useAppStore((state) => state.setCurrentProfile);
  const addProfile = useAppStore((state) => state.addProfile);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return profiles;
    return profiles.filter((p) => p.name.toLowerCase().includes(term));
  }, [profiles, search]);

  const current = profiles.find((p) => p._id === currentProfileId);

  const handleSelect = (id) => {
    setCurrentProfile(id);
    setOpen(false);
    setSearch("");
  };

  const handleAdd = async () => {
    if (!newName.trim()) return;

    try {
      const profile = await addProfile(newName.trim());
      setCurrentProfile(profile._id);
      setNewName("");
      setAdding(false);
      setOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="multiselect profile-select" ref={wrapperRef}>
      <button
        type="button"
        className="multiselect-trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={current ? "has-value" : ""}>
          {current ? current.name : "Select current profile..."}
        </span>
        <span className="chevron">⌄</span>
      </button>

      {open && (
        <div className="multiselect-menu">
          <input
            className="multiselect-search"
            placeholder="Search current profile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="multiselect-options">
            {filtered.length === 0 && (
              <p className="muted no-match">No profiles found</p>
            )}

            {filtered.map((profile) => {
              const isSelected = profile._id === currentProfileId;
              return (
                <button
                  type="button"
                  key={profile._id}
                  className={`option-row ${isSelected ? "selected" : ""}`}
                  onClick={() => handleSelect(profile._id)}
                >
                  <span className="tick">{isSelected ? "✓" : ""}</span>
                  {profile.name}
                </button>
              );
            })}
          </div>

          <div className="multiselect-footer">
            {adding ? (
              <div className="add-row">
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Profile name"
                  autoFocus
                />
                <button className="btn-primary" onClick={handleAdd}>
                  Add
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="add-trigger"
                onClick={() => setAdding(true)}
              >
                + Add Profile
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSelect;
