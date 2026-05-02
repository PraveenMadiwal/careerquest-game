const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// SOCKET SETUP
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// ==========================
// IMPORT BATTLE SYSTEM
// ==========================
const battle = require("./battle");

// CALL ONLY ONCE ✅
battle(io);

// ==========================
// LEADERBOARD (TEMP MEMORY)
// ==========================
let leaderboard = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // SEND leaderboard
  socket.emit("leaderboard", leaderboard);

  // UPDATE leaderboard
  socket.on("updateXP", (user) => {

    const index = leaderboard.findIndex(u => u.email === user.email);

    if (index !== -1) {
      leaderboard[index] = user;
    } else {
      leaderboard.push(user);
    }

    // SORT BY XP
    leaderboard.sort((a, b) => b.xp - a.xp);

    // BROADCAST
    io.emit("leaderboard", leaderboard);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log("Server running on port", PORT));