import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import SearchBar from './searchbar.jsx';
function Header({searchQuery , onSearchChange , searchStatus , onStatusChange , isLoggedIn , onLogout}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef(null);

    const userName = localStorage.getItem("userName");

    const handleLogoutClick = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");

        onLogout();
        alert("Logged out successfully!");
        navigate("/");
    };
    useEffect(() => {
  function handleClickOutside(event) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setShowMenu(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

    return (
  <div className="bg-[#1a3a8a] text-white px-10 py-2 flex items-center shadow-lg">

    <h1 className="text-4xl font-extrabold tracking-tight cursor-pointer w-1/4">
      FindIt
    </h1>

    <div className="w-2/4 flex justify-center">
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        searchStatus={searchStatus}
        onStatusChange={onStatusChange}
      />
    </div>

    <div className="w-1/4 flex justify-end items-center space-x-6 text-lg font-medium border-l-2 border-gray-300 pl-6">

      <Link className="px-4 py-2 rounded-lg hover:bg-white hover:text-[#1a3a8a]" to="/">Home</Link>

      {location.pathname !== "/submit" && (
        <Link className="px-4 py-2 rounded-lg hover:bg-white hover:text-[#1a3a8a]" to="/submit">Submit</Link>
      )}

      {location.pathname !== "/items" && (
        <Link className="px-4 py-2 rounded-lg hover:bg-white hover:text-[#1a3a8a]" to="/items">Items</Link>
      )}

      {isLoggedIn ? (
  <div className="relative" ref={dropdownRef}>
    <button
      onClick={() => setShowMenu(!showMenu)}
      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white hover:text-[#1a3a8a]"
    >
      <div className="w-8 h-8 rounded-full bg-white text-[#1a3a8a] flex items-center justify-center font-bold">
        {userName?.charAt(0).toUpperCase()}
      </div>

      <span>{userName}</span>

      <span className={`transition-transform duration-200 ${ showMenu ? "rotate-180" : "" }`} > ▼ </span>
    </button>

    {showMenu && (
      <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg overflow-hidden">
        <button
          onClick={handleLogoutClick}
          className="w-full text-left px-4 py-2 hover:bg-red-100"
        >
          Logout
        </button>
      </div>
    )}
  </div>
) : (
  <Link to="/login">Login</Link>
)}
    </div>
  </div>
);
}

export default Header;