import { io } from "socket.io-client";

const socket = io("https://careerquest-game.onrender.com");

export default socket;