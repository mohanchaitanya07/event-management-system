import Profile from "../models/Profile.js";

// Get user profile
export const getProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: 1 });
    res.status(200).json(profiles);
  } catch (error) {
    next(error);
  }
};

// create user profile
export const createProfile = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Name is Required" });
    }

    const trimmedName = name.trim();
    const existingProfile = await Profile.findOne({ name: trimmedName });
    if (existingProfile) {
      return res.status(409).json({ message: "Profile already exists" });
    }

    const newProfile = await Profile.create({ name: trimmedName });
    res.status(201).json(newProfile);
  } catch (error) {
    next(error);
  }
};

//update user timezone
export const updateProfileTimezone = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { timezone } = req.body;

    if (!timezone) {
      return res.status(400).json({ message: "Timezone is required" });
    }

    const profile = await Profile.findByIdAndUpdate(
      id,
      { timezone },
      { returnDocument: "after", runValidators: true },
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};
