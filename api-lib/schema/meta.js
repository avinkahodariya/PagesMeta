import mongoose from "mongoose";

const MetaSchema = new mongoose.Schema(
  {
    app: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Application",
    },
    page: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Pages",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    tags: [
      {
        name: String,
        value: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Meta || mongoose.model("Meta", MetaSchema);
