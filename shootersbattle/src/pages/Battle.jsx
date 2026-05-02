import { useEffect, useState } from "react";
import socket from "../services/socket";

export default function Battle() {
  const [room, setRoom] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [timer, setTimer] = useState(0);
  const [result, setResult] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // JOIN BATTLE
  const joinBattle = () => {
    socket.emit("joinBattle", user);
  };

  useEffect(() => {

    socket.on("startBattle", (data) => {
      setRoom(data.roomId);
      setQuestion(data.challenge.question);
      setTimer(data.time);

      startTimer(data.time);
    });
//     useEffect(() => {
//   if (timer === 0) {
//     setResult("⏳ Time Up!");
//   }
// }, [timer]);

    socket.on("battleResult", (data) => {
      setResult(`Winner: ${data.winner}`);
    });

    return () => {
      socket.off("startBattle");
      socket.off("battleResult");
    };

  }, []);

  // TIMER
  const startTimer = (time) => {
    let t = time;

    const interval = setInterval(() => {
      t--;
      setTimer(t);

      if (t <= 0) clearInterval(interval);
    }, 1000);
  };

  // SUBMIT
  const submit = () => {
    socket.emit("submitAnswer", {
      roomId: room,
      answer,
      user,
    });
  };

  return (
   <div className="p-6">

  <h1 className="text-3xl text-red-400 glow mb-4">
    ⚔️ Battle Arena
  </h1>

  {result && (
    <div className="card text-center text-xl text-green-400 glow">
      {result}
    </div>
  )}

</div>
  );
}