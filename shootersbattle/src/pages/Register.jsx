import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleRegister = async () => {
    await axios.post("http://localhost:5000/api/auth/register", form);
    alert("Registered Successfully");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-800 p-6 rounded-xl">
        <h1 className="text-xl mb-4">Register</h1>

        <input placeholder="Name" className="mb-3 p-2 bg-gray-700"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <input placeholder="Email" className="mb-3 p-2 bg-gray-700"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input type="password" placeholder="Password"
          className="mb-3 p-2 bg-gray-700"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <button onClick={handleRegister} className="bg-blue-500 px-4 py-2">
          Register
        </button>
      </div>
    </div>
  );
}