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

module.exports = mongoose.model("sender", SenderSchema);
