import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this pet."],
    },
    isActive: {
      default: true,
      type: Boolean,
    },
    description: {
      default: "",
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);
