import { useEffect, useState } from "react";
import socket from "../services/socket";

export default function Battle() {
  const [room, setRoom] = useState(null);
  const [question, setQuestion] = useState("");
  const [timer, setTimer] = useState(0);
  const [result, setResult] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const joinBattle = () => {
    socket.emit("joinBattle", user);
  };

  // SOCKET EVENTS
  useEffect(() => {

    socket.on("startBattle", (data) => {
      setRoom(data.roomId);
      setQuestion(data.challenge.question);
      startTimer(data.time);
    });

    socket.on("battleResult", (data) => {
      setResult(`🏆 Winner: ${data.winner}`);
    });

    return () => {
      socket.off("startBattle");
      socket.off("battleResult");
    };

  }, []);

  // TIMER EFFECT (SEPARATE HOOK ✅)
  useEffect(() => {
    if (timer === 0 && room) {
      setResult("⏳ Time Up!");
    }
  }, [timer, room]);

  // TIMER FUNCTION
  const startTimer = (time) => {
    let t = time;

    const interval = setInterval(() => {
      t--;
      setTimer(t);

      if (t <= 0) clearInterval(interval);
    }, 1000);
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl text-red-400 mb-4">
        ⚔️ Battle Arena
      </h1>

      {!room && (
        <button onClick={joinBattle} className="bg-red-500 px-4 py-2">
          Start Battle
        </button>
      )}

      {room && (
        <>
          <h2 className="mb-2">{question}</h2>
          <h3>⏳ Time: {timer}s</h3>
        </>
      )}

      {result && (
        <div className="mt-4 text-green-400 text-xl">
          {result}
        </div>
      )}

    </div>
  );
}