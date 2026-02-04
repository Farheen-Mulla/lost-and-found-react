import SearchBar from './searchbar.jsx';
function Header({searchQuery , onSearchChange , searchStatus , onStatusChange}){
    return (
        <div className="navbar">
            <h1>FindIt</h1>
            <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} searchStatus={searchStatus} onStatusChange={onStatusChange} />
        </div>
    );
}

export default Header;