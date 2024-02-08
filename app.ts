
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server as SocketServer } from "socket.io";
import users from "./routes/users";
import connectDB from "./connect";
import user from "./routes/user";
import friends from "./routes/friends";
import chats from "./routes/chats";
import messages from "./routes/messages";

dotenv.config()
const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
io.on("connection", (socket) => {
  socket.on("message", (body) => {
    socket.broadcast.emit("message", {
      body,
      from: socket.id.slice(6),
    });
  });
});
app.get("/", (req, res) => res.send("welcome"));
app.use("/api/users", users);
app.use("/api/user", user);
app.use("/api/user/friends", friends);
app.use("/api/chats", chats);
app.use("/api/messages", messages);

async function start() {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to database.");
    server.listen(port, () => console.log(`Server listening on port: ${port}`));
  }
  catch (err) {
    console.log(err);
  }
}

start();