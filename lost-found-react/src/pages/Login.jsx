import { useNavigate } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import { useState } from "react";

export default function Login({onLogin}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
    alert("Login Successful!");
    navigate("/items");
  };
  return (
    <PublicLayout>
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
          <h2 className="text-3xl font-bold text-[#1a3a8a] mb-2">Welcome Back</h2>
          <p className="text-gray-400 mb-8">Please enter your details to continue.</p>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input type="email" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400" placeholder="name@company.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Password</label>
              <input type="password" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="w-full bg-[#1a3a8a] text-white py-3 rounded-xl font-bold mt-4 hover:opacity-90 transition-opacity">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </PublicLayout>
  );
}