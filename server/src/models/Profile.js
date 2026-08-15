import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
      trim: true,
      unique: true,
    },
    timezone: {
      type: String,
      required: true,
      default: "Asia/Kolkata",
    },
  },
  { timestamps: true },
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
