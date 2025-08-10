let ioInstance;

export function initSocket(io) {
  ioInstance = io;

  io.on("connection", (socket) => {
    console.log(` Client connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

export function sendNotificationToAll(notification) {
  if (ioInstance) {
    ioInstance.emit("pushNotification", notification);
  }
}
