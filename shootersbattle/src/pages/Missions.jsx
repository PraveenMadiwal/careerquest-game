import socket from "../services/socket";

const completeMission = async (xp) => {
  const user = JSON.parse(localStorage.getItem("user"));

  user.xp += xp;

  // EMIT TO SERVER
  socket.emit("updateXP", user);

  // SAVE LOCALLY
  localStorage.setItem("user", JSON.stringify(user));

  alert("XP Added 🚀");
};

export default function Missions() {
  return <div>Missions Page</div>;
}