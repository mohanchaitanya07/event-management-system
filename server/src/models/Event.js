import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    profiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile" }],
    timezone: {
      type: String,
      required: true,
    },
    startAt: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

eventSchema.index({ profiles: 1, startAt: 1 });

const Event = mongoose.model("Event", eventSchema);

export default Event;
