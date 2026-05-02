import { useEffect, useState } from "react";
import { getUser } from "../services/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) window.location.href = "/login";
}, []);

  const fetchUser = async () => {
    const res = await getUser();
    setUser(res.data);
  };

  if (!user) return <div className="text-white">Loading...</div>;

  return (
   <div className="p-6">

  <h1 className="text-3xl font-bold mb-6">🚀 Welcome Back</h1>

  <div className="card">
    <h2 className="text-xl">Level: {user.level}</h2>

    <div className="w-full bg-gray-700 h-4 rounded mt-3">
      <div
        className="bg-green-400 h-4 rounded glow transition-all duration-500"
        style={{ width: `${user.xp}%` }}
      ></div>
    </div>

    <p className="mt-2 text-gray-300">{user.xp}/100 XP</p>
  </div>

</div>
  );
}