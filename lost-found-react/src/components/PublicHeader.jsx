import { Link, useLocation } from "react-router-dom";

export default function PublicHeader() {
  const location = useLocation();

  return (
    <nav className="bg-[#1a3a8a] text-white px-6 py-2 flex items-center shadow-lg">
      <h1 className="text-4xl font-extrabold tracking-tight ml-20 mr-80 cursor-pointer">FindIt</h1>


      {location.pathname !== "/" && (
        <Link className="ml-4 text-lg font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white hover:text-[#1a3a8a] hover:shadow-md" to="/">Home</Link>
      )}
      
      {location.pathname !== "/submit" && (
        <Link className="ml-4 text-lg font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white hover:text-[#1a3a8a] hover:shadow-md" to="/submit">Submit</Link>
      )}
      
      {location.pathname !== "/items" && (
        <Link className="ml-4 text-lg font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white hover:text-[#1a3a8a] hover:shadow-md" to="/items">Items</Link>
      )}
      
      {location.pathname !== "/login" && (
        <Link className="ml-4 text-lg font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white hover:text-[#1a3a8a] hover:shadow-md" to="/login">Login</Link>
      )}  
    </nav>
  );
}