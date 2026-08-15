import mongoose from "mongoose";

const eventLogSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    changes: [
      {
        field: { type: String, required: true },
        from: { type: mongoose.Schema.Types.Mixed },
        to: { type: mongoose.Schema.Types.Mixed },
      },
    ],
  },
  { timestamps: true },
);

eventLogSchema.index({ event: 1, createdAt: -1 });

const EventLog = mongoose.model("EventLog", eventLogSchema);

export default EventLog;
