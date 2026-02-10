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
        <div className="bg-[#1a3a8a] text-white px-6 py-2 flex items-center shadow-lg">
            <h1 className="text-4xl font-extrabold tracking-tight ml-20 mr-80 cursor-pointer">FindIt</h1>
            <div className="flex-1 flex justify-start">
                <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} searchStatus={searchStatus} onStatusChange={onStatusChange} />
            </div>
            <div className="flex space-x-6 text-lg font-medium mr-20 border-l-2 border-gray-300 pl-6">
                <Link to="/">Home</Link>
                <Link to="/submit">Submit</Link>
                {isLoggedIn ? (<button onClick={handleLogoutClick} className="bg-red-500 px-4 py-1 rounded-lg hover:bg-red-600 transition-colors">Logout</button>) : (<Link to="/login">Login</Link>)}
            </div>
        </div>
    );
}

export default Header;