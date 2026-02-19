import PublicLayout from "../layouts/PublicLayout";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <PublicLayout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-black text-[#1a3a8a] mb-6 tracking-tight">
          Lost it? <span className="text-blue-500">Find it.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-10">
          The community-driven platform to reunite people with their lost belongings. 
          Fast, secure, and easy to use.
        </p>
        <div className="flex gap-4">
          <Link to="/submit" className="bg-[#1a3a8a] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200">
            Report Lost Item
          </Link>
          <Link to="/items" className="bg-white text-[#1a3a8a] border-2 border-[#1a3a8a] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all">
            Browse Gallery
          </Link>
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          <FeatureCard icon="🔍" title="Search" desc="Filter by category, date, or location." />
          <FeatureCard icon="📱" title="Notify" desc="Get instant alerts for matches." />
          <FeatureCard icon="🤝" title="Reunite" desc="Safe communication with finders." />
        </div>
      </div>
    </PublicLayout>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-300">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500">{desc}</p>
    </div>
  );
}