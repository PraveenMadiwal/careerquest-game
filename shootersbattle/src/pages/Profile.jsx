import { useEffect, useState } from "react";
import API from "../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/user/me").then(res => setUser(res.data));
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl">👤 {user.name}</h1>

      <div className="card mt-4">
        <p>Level: {user.level}</p>
        <p>XP: {user.xp}</p>
        <p>Matches: {user.matches}</p>
      </div>
    </div>
  );
}