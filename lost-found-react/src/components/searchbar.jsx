function SearchBar({searchQuery , onSearchChange ,  searchStatus , onStatusChange}){
    return(
        <div className="searchItem">
            <input type="text" placeholder="Search for lost or found items..." value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} />
            <select value={searchStatus} onChange={(e) => onStatusChange(e.target.value)}>
                <option value="all">All</option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
            </select>
        </div>
    );
}

export default SearchBar;