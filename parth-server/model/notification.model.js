// model/notification.model.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  content: { type: String },
  type: { type: String },
  icon: { type: String },
  image: { type: String },
  button: {
    text: String,
    link: String
  },
  time: { type: Date, default: Date.now }
});

export default mongoose.model("Notification", notificationSchema);
