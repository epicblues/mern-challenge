import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  id: String,
  name: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
