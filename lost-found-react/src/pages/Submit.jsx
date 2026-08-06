import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import ItemForm from "../components/ItemForm";

const SUCCESS_DISPLAY_MS = 2000;

export default function Submit({ reloadItems, isLoggedIn, onLogout }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle"); 
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: "/submit" } });
    }
  }, [isLoggedIn, navigate]);

  const handleAddAndRedirect = async (newItem) => {
    setStatus("submitting");
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("name", newItem.name);
      formData.append("desc", newItem.desc);
      formData.append("contact", newItem.contact);
      formData.append("status", newItem.status);
      formData.append("image", newItem.image);

      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://lost-found-backend-ajdo.onrender.com/api/upload",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit item");
      }

      await reloadItems();
      setStatus("success");
      setTimeout(() => navigate("/items"), SUCCESS_DISPLAY_MS);
    } catch (err) {
      console.error("Failed to submit:", err);
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  if (!isLoggedIn) return null;

  return (
    <AppLayout isLoggedIn={isLoggedIn} onLogout={onLogout}>
      <div className="min-h-[calc(100vh-4rem)] bg-[#eef3fc] flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-md animate-[fadeSlideIn_0.4s_ease-out]">

          {status === "error" && (
            <div
              role="alert"
              className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 animate-[shake_0.4s_ease-in-out]"
            >
              <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}

          {status === "success" ? (
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(26,58,138,0.12)] border border-[#d7e2f7] flex flex-col items-center justify-center py-16 px-6 animate-[fadeSlideIn_0.3s_ease-out] overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-[popIn_0.4s_ease-out]">
                <svg className="w-9 h-9 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-[#1a3a8a]">Item submitted!</p>
              <p className="text-sm text-slate-400 mb-5">Taking you to the listings…</p>
              <div className="w-full h-1 bg-[#e3eaf7] rounded-full overflow-hidden">
                <div className="h-full bg-[#3b8bf6] progress-drain" />
              </div>
            </div>
          ) : (
            <ItemForm onAddItem={handleAddAndRedirect} isSubmitting={status === "submitting"} />
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0% { transform: scale(0.6); opacity: 0; }
          80% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .progress-drain {
          animation: drain ${SUCCESS_DISPLAY_MS}ms linear forwards;
        }
        @keyframes drain {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </AppLayout>
  );
}