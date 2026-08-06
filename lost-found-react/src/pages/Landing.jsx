import PublicLayout from "../layouts/PublicLayout";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <PublicLayout>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute top-40 -right-32 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl" />

        <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4">

          <span className="opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards] inline-flex items-center gap-2 bg-blue-50 text-[#1a3a8a] border border-blue-100 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            ✨ AI-Powered Matching
          </span>

          <h1
            className="opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards] text-5xl sm:text-6xl font-black text-[#1a3a8a] mb-6 tracking-tight"
            style={{ animationDelay: "80ms" }}
          >
            Lost it? <span className="text-blue-500">Find it.</span>
          </h1>

          <p
            className="opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards] text-lg sm:text-xl text-gray-600 max-w-2xl mb-10"
            style={{ animationDelay: "160ms" }}
          >
            The community-driven platform to reunite people with their lost belongings.
            Fast, secure, and easy to use.
          </p>

          <div
            className="opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards] flex flex-col sm:flex-row gap-4"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              to="/submit"
              className="group bg-[#1a3a8a] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 active:scale-[0.97] transition-all shadow-lg hover:shadow-blue-200 hover:shadow-xl"
            >
              Report Lost Item
              <span className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/items"
              className="bg-white text-[#1a3a8a] border-2 border-[#1a3a8a] px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 active:scale-[0.97] transition-all"
            >
              Browse Gallery
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
            <FeatureCard icon="🔍" title="Search" desc="Filter by category, status, or keyword." delay={0} />
            <FeatureCard icon="🤖" title="AI Matching" desc="Smart suggestions connect lost items to found ones automatically." delay={80} />
            <FeatureCard icon="📱" title="Notify" desc="Get instant alerts for matches." delay={160} />
            <FeatureCard icon="🤝" title="Reunite" desc="Verify and connect safely with finders." delay={240} />
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

function FeatureCard({ icon, title, desc, delay }) {
  return (
    <div
      style={{ animationDelay: `${320 + delay}ms` }}
      className="opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards] bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 border border-gray-100 transition-all duration-200"
    >
      <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-3xl mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm">{desc}</p>
    </div>
  );
}