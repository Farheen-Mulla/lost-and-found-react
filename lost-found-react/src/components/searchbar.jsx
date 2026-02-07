function SearchBar({searchQuery , onSearchChange ,  searchStatus , onStatusChange}){
    return(
        <div className="flex gap-2 items-center">
            <input type="text" placeholder="Search items..." className="bg-white border-[2.5px] border-[rgb(161,154,200)] text-[1.2rem] h-10 pl-2 my-2 rounded-lg outline-none text-[#183175]" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} />
            <select className=" bg-white border-[2.5px] border-[rgb(161,154,200)] text-[1.2rem] h-10 pl-2 my-2 rounded-lg outline-none text-[#183175]" value={searchStatus} onChange={(e) => onStatusChange(e.target.value)}>
                <option value="all">All</option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
            </select>
        </div>
    );
}

export default SearchBar;