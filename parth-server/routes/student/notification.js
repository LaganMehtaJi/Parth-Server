// routes/student/notification.js
import express from "express";
import notificationsController from "../../controller/Notification.js";

export default (io) => {
  const router = express.Router();
  const controller = notificationsController(io);

  // Send notification
  router.post("/send", controller.pushNotification);

  // Get all notifications
  router.get("/", controller.getNotifications);

  return router;
};
