import SearchBar from './searchbar.jsx';
function Header({searchQuery , onSearchChange , searchStatus , onStatusChange}){
    return (
        <div className="bg-[#1a3a8a] text-white px-6 py-2 flex items-center shadow-lg">
            <h1 className="text-4xl font-extrabold tracking-tight ml-20 mr-80 cursor-pointer">FindIt</h1>
            <div className="flex-1 flex justify-start">
                <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} searchStatus={searchStatus} onStatusChange={onStatusChange} />
            </div>
            
        </div>
    );
}

export default Header;