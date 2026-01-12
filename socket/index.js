import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { v4 as uuid } from "uuid";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5001;

// socket io
const io = new Server(server, {
  cors: {
    origin: "https://omega-x.vercel.app",
  },
});

// Middleware
app.use(
  cors({
    origin: "https://omega-x.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// socket io connection

const watingList = [];
const activePairs = new Map();

io.on("connection", (socket) => {
  console.log(socket.id);
  if (watingList.includes(socket.id)) return;
  socket.on("start", () => {
    if (watingList.length > 0) {
      //agar ek bhi user h to ye chalega
      const partner = watingList.shift(); //Removes the first element from an array and returns
      const roomId = uuid();
      activePairs.set(socket.id, partner);
      activePairs.set(partner, socket.id);
      console.log(watingList, activePairs);
      socket.emit("matched", { roomId });
      socket.to(partner).emit("matched", { roomId });
    } else {
      watingList.push(socket.id);
      socket.emit("waiting");
    }
  });

  socket.on("next", () => {
    handelLeave(socket.id);
  });

  function handelLeave(id) {
    const idx = watingList.indexOf(id);
    if (idx !== -1) {
      watingList.splice(idx, 1);
    }
    const partner = activePairs.get(id);
    if (partner) {
      io.to(partner).emit("partner_leaft");
      activePairs.delete(id);
      activePairs.delete(partner);
    }
  }

  socket.on("disconnect", () => handelLeave(socket.id));
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
