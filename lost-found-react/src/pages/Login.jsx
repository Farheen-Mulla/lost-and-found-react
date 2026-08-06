import { useNavigate } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import { useState } from "react";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch(
        "https://lost-found-backend-ajdo.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userId", data.user.id);

      onLogin();
      navigate("/items");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicLayout>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute top-40 -right-32 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl" />

        <div className="relative flex justify-center items-center min-h-[70vh] px-4">
          <div className="opacity-0 animate-[scaleIn_0.35s_ease-out_forwards] bg-white p-8 sm:p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
            <h2 className="text-3xl font-bold text-[#1a3a8a] mb-2">Welcome Back</h2>
            <p className="text-gray-400 mb-8">Please enter your details to continue.</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4 animate-[fadeIn_0.2s_ease-out]">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold mb-1">Email</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
                  <input
                    type="email"
                    className="w-full p-3 pl-10 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-shadow"
                    placeholder="name@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full p-3 pl-10 pr-10 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-shadow"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
                  >
                    {showPassword ? <i class="ri-eye-line"></i> : <i class="ri-eye-off-line"></i>}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1a3a8a] text-white py-3 rounded-xl font-bold mt-4 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="text-center mt-4 text-gray-600">
              Don't have an account?{" "}
              <span
                className="text-blue-600 font-semibold cursor-pointer hover:underline"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}