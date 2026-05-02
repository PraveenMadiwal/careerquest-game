import { useEffect, useState } from "react";
import socket from "../services/socket";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on("leaderboard", (data) => {
      setPlayers(data);
    });

    return () => socket.off("leaderboard");
  }, []);

  return (
    <div className="p-6">

  <h1 className="text-3xl text-yellow-400 glow mb-6">
    🏆 Leaderboard
  </h1>

  <div className="card">
    {players.map((p, i) => (
      <div
        key={i}
        className="flex justify-between p-3 border-b border-gray-700 hover:bg-gray-800 transition"
      >
        <span>#{i + 1} {p.name}</span>
        <span className="text-green-400">{p.xp} XP</span>
      </div>
    ))}
  </div>

</div>
  );
}