// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";

import ConnectDb from "./config/db.js";
import StudentOpp from "./routes/student/profile.routes.js";
import Student from "./routes/admin/student.routes.js";
import AuthStudent from "./routes/student/auth.routes.js";
import AuthAdmin from "./routes/admin/auth.routes.js";
import notificationRoutes from "./routes/student/notification.js";
import ProjectRoutes from "./routes/student/projects.routes.js";
import SkillRoutes from "./routes/student/skill.routes.js";
import ProfileRoutes from "./routes/student/profile.routes.js";
import VoluntaryRoutes from "./routes/student/voluntary.routes.js";;
import { initSocket } from "./soket.js";

dotenv.config();

// Initialize app
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Create HTTP & Socket.IO server BEFORE routes
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST","PUT","PATCH"],
  },
});

// Init socket
initSocket(io);

// Routes
app.use("/api/notifications", notificationRoutes(io));
app.use("/api/student", Student);
app.use("/api/auth/student", AuthStudent);
app.use("/api/auth/admin", AuthAdmin);
app.use("/api/auth/profile", StudentOpp);
app.use("/api/project",ProjectRoutes);
app.use("/api/skill",SkillRoutes);
app.use("/api/profile",ProfileRoutes);
app.use("/api/voluntary",VoluntaryRoutes);
// Connect to DB
ConnectDb();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
