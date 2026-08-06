import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import SearchBar from './searchbar.jsx';

function Header({ searchQuery, onSearchChange, searchStatus, onStatusChange, isLoggedIn, onLogout }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    const [showMobileNav, setShowMobileNav] = useState(false);
    const dropdownRef = useRef(null);
    const mobileNavRef = useRef(null);

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
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowMenu(false);
            }
            if (mobileNavRef.current && !mobileNavRef.current.contains(event.target)) {
                setShowMobileNav(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-[#1a3a8a] text-white sticky top-0 z-40 shadow-lg">
            <div className="px-4 sm:px-8 py-3 flex items-center gap-4 flex-wrap lg:flex-nowrap">

                <h1
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight cursor-pointer shrink-0"
                    onClick={() => navigate("/")}
                >
                    FindIt
                </h1>

                <div className="order-3 lg:order-2 w-full lg:w-auto lg:flex-1 flex justify-center">
                    <SearchBar
                        searchQuery={searchQuery}
                        onSearchChange={onSearchChange}
                        searchStatus={searchStatus}
                        onStatusChange={onStatusChange}
                    />
                </div>

                {/* Desktop nav links — hidden below lg breakpoint */}
                <div className="order-2 lg:order-3 hidden lg:flex items-center gap-2 text-[15px] font-medium ml-auto">
                    <Link className="px-4 py-2 rounded-lg hover:bg-white hover:text-[#1a3a8a] transition-colors" to="/">
                        Home
                    </Link>

                    {location.pathname !== "/submit" && (
                        <Link className="px-4 py-2 rounded-lg hover:bg-white hover:text-[#1a3a8a] transition-colors" to="/submit">
                            Submit
                        </Link>
                    )}

                    {location.pathname !== "/items" && (
                        <Link className="px-4 py-2 rounded-lg hover:bg-white hover:text-[#1a3a8a] transition-colors" to="/items">
                            Items
                        </Link>
                    )}

                    {isLoggedIn ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white hover:text-[#1a3a8a] transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-white text-[#1a3a8a] flex items-center justify-center font-bold shrink-0">
                                    {userName?.charAt(0).toUpperCase()}
                                </div>
                                <span>{userName}</span>
                                <span className={`transition-transform duration-200 text-xs ${showMenu ? "rotate-180" : ""}`}>
                                    ▼
                                </span>
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
                        <Link className="px-4 py-2 rounded-lg hover:bg-white hover:text-[#1a3a8a] transition-colors" to="/login">
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile hamburger — only visible below lg breakpoint */}
                <div className="order-2 lg:hidden ml-auto relative" ref={mobileNavRef}>
                    <button
                        onClick={() => setShowMobileNav(!showMobileNav)}
                        className="text-2xl px-2 py-1 rounded-lg hover:bg-white/10"
                        aria-label="Toggle menu"
                    >
                        ☰
                    </button>

                    {showMobileNav && (
                        <div className="absolute right-0 mt-2 w-48 bg-white text-[#1a3a8a] rounded-lg shadow-lg overflow-hidden flex flex-col py-1 z-50">
                            <Link
                                className="px-4 py-2 hover:bg-blue-50"
                                to="/"
                                onClick={() => setShowMobileNav(false)}
                            >
                                Home
                            </Link>
                            {location.pathname !== "/submit" && (
                                <Link
                                    className="px-4 py-2 hover:bg-blue-50"
                                    to="/submit"
                                    onClick={() => setShowMobileNav(false)}
                                >
                                    Submit
                                </Link>
                            )}
                            {location.pathname !== "/items" && (
                                <Link
                                    className="px-4 py-2 hover:bg-blue-50"
                                    to="/items"
                                    onClick={() => setShowMobileNav(false)}
                                >
                                    Items
                                </Link>
                            )}
                            {isLoggedIn ? (
                                <button
                                    onClick={handleLogoutClick}
                                    className="text-left px-4 py-2 hover:bg-red-50 text-red-600"
                                >
                                    Logout ({userName})
                                </button>
                            ) : (
                                <Link
                                    className="px-4 py-2 hover:bg-blue-50"
                                    to="/login"
                                    onClick={() => setShowMobileNav(false)}
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;