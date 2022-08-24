import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    hash: {
        type: String,
      },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.user || mongoose.model("Users", UserSchema);
