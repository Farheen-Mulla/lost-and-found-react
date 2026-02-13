import { Link, useNavigate } from "react-router-dom";
import SearchBar from './searchbar.jsx';
function Header({searchQuery , onSearchChange , searchStatus , onStatusChange , isLoggedIn , onLogout}) {
    const navigate = useNavigate();
    const handleLogoutClick = () => {
        onLogout();
        alert("Logged out successfully!");
        navigate("/");
    };
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
        <button onClick={handleLogoutClick} className="bg-red-500 px-4 py-1 rounded-lg">
          Logout
        </button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  </div>
);
}

export default Header;