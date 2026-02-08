import mongoose from "mongoose";
const SenderSchema = new mongoose.Schema({
  googleId: String,
  email: String,
  refreshToken: String,
  scope: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("sender",SenderSchema);
