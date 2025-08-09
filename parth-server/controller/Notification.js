// controllers/notifications.controller.js
import Notification from "../model/notification.model.js";

export default (io) => ({
  pushNotification: async (req, res) => {
    try {
      const { title, subtitle, content, type, icon, image, button } = req.body;

      if (!title) {
        return res.status(400).json({ error: "Title is required" });
      }

      // Save notification in DB
      const newNotification = await Notification.create({
        title,
        subtitle,
        content,
        type,
        icon,
        image,
        button,
        time: new Date()
      });

      // Emit via Socket.IO
      io.emit("pushNotification", newNotification);

      res.status(201).json({
        success: true,
        message: "Notification saved and sent",
        data: newNotification
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },

  getNotifications: async (req, res) => {
    try {
      const notifications = await Notification.find().sort({ time: -1 });
      res.json({ success: true, data: notifications });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }
});
