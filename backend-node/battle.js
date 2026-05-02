let rooms = {};
let waitingPlayer = null;

const { getRandomQuestion } = require("./services/questionService");
const { runCode } = require("./services/codeExecutor");

module.exports = (io) => {

  io.on("connection", (socket) => {

    console.log("Battle user:", socket.id);

    socket.on("joinBattle", (user) => {

      if (waitingPlayer) {

        const roomId = "room_" + Date.now();

        rooms[roomId] = {
          players: [
            waitingPlayer,
            { socketId: socket.id, user }
          ],
          question: null
        };

        socket.join(roomId);
        io.sockets.sockets.get(waitingPlayer.socketId)?.join(roomId);

        const challenge = getRandomQuestion();
        rooms[roomId].question = challenge;

        io.to(roomId).emit("startBattle", {
          roomId,
          challenge,
          time: 30
        });

        waitingPlayer = null;

      } else {
        waitingPlayer = {
          socketId: socket.id,
          user
        };

        socket.emit("waiting", "Waiting for opponent...");
      }
    });

    socket.on("submitAnswer", async ({ roomId, code, user, language = "js" }) => {

      const room = rooms[roomId];
      if (!room || !room.question) return;

      const testCases = room.question.testCases;

      let passedAll = true;

      for (let test of testCases) {
        const output = await runCode(code, test.input, language);

        if (String(output) !== String(test.output)) {
          passedAll = false;
          break;
        }
      }

      if (passedAll) {
        io.to(roomId).emit("battleResult", {
          winner: user.name,
          xp: room.question.xp
        });

        delete rooms[roomId];
      }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
    });

  });
};