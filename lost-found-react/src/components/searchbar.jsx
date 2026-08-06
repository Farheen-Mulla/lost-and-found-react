function SearchBar({ searchQuery, onSearchChange, searchStatus, onStatusChange }) {
    return (
        <div className="flex gap-2 items-center w-full max-w-xl">
            <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
                    🔍
                </span>

                <input
                    type="text"
                    placeholder="Search items..."
                    className="w-full bg-white border border-gray-200 text-[15px] h-10 pl-9 pr-8 rounded-full outline-none text-[#183175] shadow-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-shadow"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />

                {searchQuery && (
                    <button
                        onClick={() => onSearchChange("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 text-sm w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-100"
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>

            <select
                className="bg-white border border-gray-200 text-[15px] h-10 px-3 rounded-full outline-none text-[#183175] shadow-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-shadow shrink-0"
                value={searchStatus}
                onChange={(e) => onStatusChange(e.target.value)}
            >
                <option value="all">All</option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
            </select>
        </div>
    );
}

export default SearchBar;