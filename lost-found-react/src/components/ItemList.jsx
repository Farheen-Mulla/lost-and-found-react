import { useState, useEffect, useRef } from 'react';

function ItemList({ items, isLoading, onDeleteItem, onEditItem }) {
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const loggedInUserId = localStorage.getItem("userId");
    const menuRef = useRef(null);

    const [openMatchesId, setOpenMatchesId] = useState(null);
    const [matchesById, setMatchesById] = useState({});
    const [loadingMatchesId, setLoadingMatchesId] = useState(null);

    const [verificationById, setVerificationById] = useState({});
    const [loadingVerificationId, setLoadingVerificationId] = useState(null);
    const [revealedContacts, setRevealedContacts] = useState({});

    const [selectedItem, setSelectedItem] = useState(null);

    const toggleMenu = (index) => {
        setOpenMenuIndex(openMenuIndex === index ? null : index);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuIndex(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    async function handleGetVerificationQuestion(matchId) {
        if (verificationById[matchId]) return;

        setLoadingVerificationId(matchId);

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                `https://lost-found-backend-ajdo.onrender.com/api/items/${matchId}/verification-question`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) throw new Error("Failed to get verification question");

            const data = await res.json();
            setVerificationById((prev) => ({ ...prev, [matchId]: data.question }));
        } catch (err) {
            console.error("Verification question error:", err);
            setVerificationById((prev) => ({
                ...prev,
                [matchId]: "Could not generate a question — ask the other person to describe the item in detail before sharing contact info.",
            }));
        } finally {
            setLoadingVerificationId(null);
        }
    }

    async function handleFindMatches(itemId) {
        if (openMatchesId === itemId) {
            setOpenMatchesId(null);
            return;
        }

        setOpenMatchesId(itemId);

        if (matchesById[itemId]) return;

        setLoadingMatchesId(itemId);

        try {
            const res = await fetch(
                `https://lost-found-backend-ajdo.onrender.com/api/items/${itemId}/matches`
            );

            if (!res.ok) {
                throw new Error("Failed to fetch matches");
            }

            const data = await res.json();
            setMatchesById((prev) => ({ ...prev, [itemId]: data }));
        } catch (err) {
            console.error("Find matches error:", err);
            setMatchesById((prev) => ({ ...prev, [itemId]: [] }));
        } finally {
            setLoadingMatchesId(null);
        }
    }

    function renderMatchesSection(item) {
        return (
            <>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleFindMatches(item._id);
                    }}
                    className="mt-3 w-full px-3 py-2 bg-[#1a3a8a] text-white rounded-lg text-sm font-semibold hover:bg-blue-700 active:scale-[0.97] transition-all"
                >
                    {openMatchesId === item._id ? "Hide Matches" : "🔍 Find Possible Matches"}
                </button>

                {openMatchesId === item._id && (
                    <div className="mt-3 border-t pt-3 animate-[fadeIn_0.25s_ease-out]">
                        {loadingMatchesId === item._id ? (
                            <p className="text-gray-500 italic text-sm">Searching for matches...</p>
                        ) : matchesById[item._id]?.length > 0 ? (
                            <div className="flex flex-col gap-3">
                                {matchesById[item._id].map((match) => (
                                    <div
                                        key={match._id}
                                        className="flex gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200"
                                    >
                                        {match.image && (
                                            <img
                                                src={match.image}
                                                alt={match.name}
                                                className="w-14 h-14 object-cover rounded-lg shrink-0"
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center gap-2">
                                                <h4 className="font-bold text-sm truncate">{match.name}</h4>
                                                <span className="text-xs text-gray-500 shrink-0">
                                                    {Math.round(match.matchScore * 100)}% match
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-600 line-clamp-2">{match.desc}</p>

                                            {revealedContacts[match._id] ? (
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Contact: {match.contact}
                                                </p>
                                            ) : (
                                                <div className="mt-2">
                                                    {verificationById[match._id] ? (
                                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                                                            <p className="text-[11px] font-semibold text-yellow-800 mb-1">
                                                                🔒 Ask before sharing contact:
                                                            </p>
                                                            <p className="text-xs text-gray-700 italic mb-2">
                                                                "{verificationById[match._id]}"
                                                            </p>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setRevealedContacts((prev) => ({
                                                                        ...prev,
                                                                        [match._id]: true,
                                                                    }));
                                                                }}
                                                                className="text-[11px] px-2 py-1 bg-yellow-500 text-white rounded-md font-semibold hover:bg-yellow-600"
                                                            >
                                                                Verified — show contact
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleGetVerificationQuestion(match._id);
                                                            }}
                                                            className="text-[11px] px-2 py-1 bg-gray-200 text-gray-700 rounded-md font-semibold hover:bg-gray-300"
                                                        >
                                                            {loadingVerificationId === match._id
                                                                ? "Generating..."
                                                                : "🔒 Verify before contacting"}
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic text-sm">No possible matches found yet.</p>
                        )}
                    </div>
                )}
            </>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#1a3a8a] mb-6">Browse Items</h2>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl shadow-md border border-gray-100 p-4 animate-pulse"
                        >
                            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
                            <div className="h-40 bg-gray-200 rounded-lg mb-3" />
                            <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                            <div className="h-3 bg-gray-200 rounded w-2/3 mb-4" />
                            <div className="h-9 bg-gray-200 rounded-lg w-full" />
                        </div>
                    ))}
                </div>
            ) : items.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-xl">No items to display yet.</p>
                    <p className="text-gray-400 text-sm mt-1">Reported items will show up here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map((item, index) => {
                        const isOwner = item.user === loggedInUserId;
                        return (
                            <div
                                key={item._id}
                                onClick={() => setSelectedItem(item)}
                                style={{ animationDelay: `${Math.min(index, 10) * 40}ms` }}
                                className="relative bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-gray-100 p-4 flex flex-col h-full cursor-pointer opacity-0 animate-[fadeInUp_0.4s_ease-out_forwards]"
                            >
                                <div className="flex justify-between items-start gap-2">
                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                                    {isOwner && (
                                        <div
                                            className="relative shrink-0"
                                            ref={openMenuIndex === index ? menuRef : null}
                                        >
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleMenu(index);
                                                }}
                                                className="text-xl font-bold p-1 px-2 hover:bg-gray-100 rounded-full leading-none"
                                            >
                                                &#8942;
                                            </button>
                                            {openMenuIndex === index && (
                                                <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden origin-top animate-[slideDown_0.15s_ease-out]">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onEditItem(item);
                                                            setOpenMenuIndex(null);
                                                        }}
                                                        className="w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-600 font-semibold text-sm"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onDeleteItem(item._id);
                                                            setOpenMenuIndex(null);
                                                        }}
                                                        className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 font-semibold text-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-40 object-contain bg-gray-50 rounded-lg mt-3 mb-3"
                                    />
                                ) : (
                                    <div className="w-full h-40 rounded-lg mt-3 mb-3 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                                        No image
                                    </div>
                                )}

                                <p className="text-sm text-gray-600 line-clamp-2 flex-1">{item.desc}</p>

                                <div className="flex justify-between items-center w-full mt-4 gap-2">
                                    <p className="text-sm text-gray-500 truncate">Contact: {item.contact}</p>
                                    <span
                                        className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] text-white font-bold uppercase tracking-wide ${
                                            item.status === 'lost' ? 'bg-red-500' : 'bg-green-500'
                                        }`}
                                    >
                                        {item.status}
                                    </span>
                                </div>

                                <div onClick={(e) => e.stopPropagation()}>
                                    {renderMatchesSection(item)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {selectedItem && (
                <div
                    onClick={() => setSelectedItem(null)}
                    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto p-6 relative animate-[scaleIn_0.25s_ease-out]"
                    >
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 hover:rotate-90 transition-transform duration-200"
                        >
                            &times;
                        </button>

                        <h3 className="text-2xl font-bold text-gray-900 pr-8">{selectedItem.name}</h3>

                        {selectedItem.image ? (
                            <img
                                src={selectedItem.image}
                                alt={selectedItem.name}
                                className="w-full h-64 sm:h-80 object-contain bg-gray-50 rounded-lg mt-4 mb-4"
                            />
                        ) : (
                            <div className="w-full h-64 rounded-lg mt-4 mb-4 bg-gray-100 flex items-center justify-center text-gray-400">
                                No image
                            </div>
                        )}

                        <p className="text-base text-gray-700">{selectedItem.desc}</p>

                        <div className="flex justify-between items-center w-full mt-4 gap-2">
                            <p className="text-sm text-gray-500">Contact: {selectedItem.contact}</p>
                            <span
                                className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] text-white font-bold uppercase tracking-wide ${
                                    selectedItem.status === 'lost' ? 'bg-red-500' : 'bg-green-500'
                                }`}
                            >
                                {selectedItem.status}
                            </span>
                        </div>

                        {renderMatchesSection(selectedItem)}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ItemList;