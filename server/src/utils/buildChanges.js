export const buildChanges = (existingEvent, updated) => {
  const changes = [];
  const oldIds = existingEvent.profiles.map((p) => p.toString());
  const newIds = updated.profiles.map((p) => p.toString());

  const newIdSet = new Set(newIds);
  const profilesChanged =
    oldIds.length !== newIds.length || oldIds.some((id) => !newIdSet.has(id));

  if (profilesChanged) {
    changes.push({ field: "profiles", from: oldIds, to: newIds });
  }

  if (existingEvent.timezone !== updated.timezone) {
    changes.push({
      field: "timezone",
      from: existingEvent.timezone,
      to: updated.timezone,
    });
  }

  if (existingEvent.startAt.getTime() !== updated.startAt.getTime()) {
    changes.push({
      field: "startAt",
      from: existingEvent.startAt,
      to: updated.startAt,
    });
  }

  if (existingEvent.endAt.getTime() !== updated.endAt.getTime()) {
    changes.push({
      field: "endAt",
      from: existingEvent.endAt,
      to: updated.endAt,
    });
  }

  return changes;
};
