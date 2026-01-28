function SearchBar(){
    return(
        <div className="searchItem">
            <input type="text" placeholder="Search for lost or found items..." />
            <select>
                <option value="all">All</option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
            </select>
        </div>
    );
}

export default SearchBar;