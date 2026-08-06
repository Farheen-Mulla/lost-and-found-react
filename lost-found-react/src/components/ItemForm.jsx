import { useState, useEffect, useRef } from "react";

const AI_ENDPOINT = "https://lost-found-backend-ajdo.onrender.com/api/ai/describe";

function ItemForm({ editingItem, onAddItem, onUpdateItem, isSubmitting }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("lost");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name || "");
      setDesc(editingItem.desc || "");
      setContact(editingItem.contact || "");
      setStatus(editingItem.status || "lost");
      if (editingItem.image) setPreviewUrl(editingItem.image);
    }
  }, [editingItem]);

  
  useEffect(() => {
    if (!image) return;
    const url = URL.createObjectURL(image);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  async function analyzeImage(file) {
    setIsAnalyzing(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(AI_ENDPOINT, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("AI description failed");

      const data = await res.json();
      setName((prev) => prev || data.name);
      setDesc((prev) => prev || data.desc);
    } catch (err) {
      console.error("AI describe error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleFile(file) {
    if (!file || !file.type.startsWith("image/")) return;
    setImage(file);
    analyzeImage(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const itemData = { _id: editingItem?._id, name, desc, contact, status, image };

    if (editingItem && onUpdateItem) {
      onUpdateItem(itemData);
    } else if (onAddItem) {
      onAddItem(itemData);
    }
  }

  const isEditing = Boolean(editingItem);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white rounded-2xl shadow-[0_4px_24px_rgba(26,58,138,0.08)] border border-[#e3eaf7] p-7 flex flex-col gap-5"
    >
      <div className="stagger-in" style={{ "--d": "0ms" }}>
        <p className="text-xs font-semibold tracking-wide text-[#3b8bf6] uppercase mb-1">
          {isEditing ? "Editing item" : "Lost & Found · Report"}
        </p>
        <h2 className="text-[#1a3a8a] text-2xl font-bold">
          {isEditing ? "Update the details" : "Tell us what happened"}
        </h2>
      </div>

      <div
        className="stagger-in"
        style={{ "--d": "60ms" }}
      >
        <label
          htmlFor="upload-image"
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed cursor-pointer overflow-hidden transition-colors duration-200 h-40
            ${isDragging ? "border-[#3b8bf6] bg-[#eef4ff]" : "border-[#c7d7f5] bg-[#f7faff] hover:border-[#3b8bf6] hover:bg-[#eef4ff]"}`}
        >
          {previewUrl ? (
            <>
              <img
                src={previewUrl}
                alt="Selected item"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-[#1a3a8a]/40 flex flex-col items-center justify-center gap-1 scan-shimmer">
                  <svg className="w-6 h-6 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                  <span className="text-white text-xs font-medium">Reading your photo…</span>
                </div>
              )}
              {!isAnalyzing && (
                <div className="absolute bottom-2 right-2 bg-white/90 text-[#1a3a8a] text-xs font-medium px-2 py-1 rounded-full">
                  Change photo
                </div>
              )}
            </>
          ) : (
            <>
              <svg className="w-8 h-8 text-[#3b8bf6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 16.5V9.75m0 0l-3 3m3-3l3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
              <p className="text-sm text-[#1a3a8a] font-medium">Drop a photo, or click to upload</p>
              <p className="text-xs text-slate-400">AI fills in the name & description for you</p>
            </>
          )}
        </label>
        <input
          ref={fileInputRef}
          id="upload-image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 stagger-in" style={{ "--d": "120ms" }}>
        <Field label="Item name">
          <input
            type="text"
            placeholder="e.g. Blue backpack"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="field-input"
            required
          />
        </Field>

        <Field label="Status">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="field-input pr-2"
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </Field>
      </div>

      <div className="stagger-in" style={{ "--d": "160ms" }}>
        <Field label="Description">
          <textarea
            placeholder="Where and when, any distinguishing details…"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={3}
            className="field-input resize-none py-2"
            required
          />
        </Field>
      </div>

      <div className="stagger-in" style={{ "--d": "200ms" }}>
        <Field label="Contact information">
          <input
            type="text"
            placeholder="Email or phone number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="field-input"
            required
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="stagger-in mt-1 flex items-center justify-center gap-2 bg-[#1a3a8a] text-white font-semibold rounded-xl h-11 hover:bg-[#142d6b] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ "--d": "240ms" }}
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
            {isEditing ? "Updating…" : "Submitting…"}
          </>
        ) : (
          <>
            {isEditing ? "Update item" : "Submit report"}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </>
        )}
      </button>

      <style>{`
        .field-input {
          background: #fff;
          width: 100%;
          border: 1.5px solid #dbe4f5;
          font-size: 0.95rem;
          height: 2.5rem;
          padding-left: 0.7rem;
          border-radius: 0.6rem;
          color: #1e2a4a;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .field-input:focus {
          outline: none;
          border-color: #3b8bf6;
          box-shadow: 0 0 0 3px rgba(59,139,246,0.15);
        }
        .stagger-in {
          animation: fieldIn 0.45s ease-out backwards;
          animation-delay: var(--d, 0ms);
        }
        @keyframes fieldIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scan-shimmer::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.25), transparent);
          background-size: 200% 100%;
          animation: shimmerSweep 1.4s linear infinite;
        }
        @keyframes shimmerSweep {
          from { background-position: 200% 0; }
          to { background-position: -200% 0; }
        }
      `}</style>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium text-slate-500">{label}</span>
      {children}
    </label>
  );
}

export default ItemForm;