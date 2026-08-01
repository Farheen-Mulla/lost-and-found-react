import { useState } from 'react';

function ItemList({ items, onDeleteItem, onEditItem }) {
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const loggedInUserId = localStorage.getItem("userId");

    const [openMatchesId, setOpenMatchesId] = useState(null);
    const [matchesById, setMatchesById] = useState({});
    const [loadingMatchesId, setLoadingMatchesId] = useState(null);

    const toggleMenu = (index) => {
        setOpenMenuIndex(openMenuIndex === index ? null : index);
    };

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

    console.log("Items in ItemList:", items);
    return (
        <div className="p-4 bg-[#b4cbf0] h-[30rem] overflow-y-auto w-[50rem] border-4 border-[#1e3985] rounded-lg">
            <h2 className="text-[2rem] text-blue-500 font-['Gill_Sans',...sans-serif] h-8 my-6 mt-0 pt-4 pl-4">Items List</h2>
            
            {items.length === 0 ? (
                <p className="text-center text-gray-600 text-xl mt-10">No items to display</p>
            ) : (
                items.map((item, index) => {
                    const isOwner = item.user === loggedInUserId;
                    return (
                        <div key={item._id} className="relative min-h-[6rem] w-full bg-white p-4 rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.35)] my-4 flex flex-col"> 
                            
                            <div className="flex justify-between items-start">
                                <h3 className="text-2xl font-bold">{item.name}</h3>
                            {isOwner && (
                                <div className="relative">
                                <button 
                                    onClick={() => toggleMenu(index)}
                                    className="text-2xl font-bold p-1 px-3 hover:bg-gray-100 rounded-full">
                                    &#8942; 
                                </button>
                                {openMenuIndex === index && (
                                    <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-300 rounded shadow-lg z-50">
                                        <button 
                                            onClick={() => { onEditItem(item); setOpenMenuIndex(null); }}
                                            className="w-full text-left px-4 py-2 hover:bg-blue-100 text-blue-600 font-bold">
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => { onDeleteItem(item._id); setOpenMenuIndex(null); }}
                                            className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 font-bold">
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                            )}
                        </div>

                        {item.image && (
                            <img 
                                src={item.image}
                                alt={item.name}
                                className="w-[150px] h-[150px] object-cover rounded-lg mb-2"
                            />
                        )}
                        <p className="text-xl text-gray-700">{item.desc}</p>
                        
                        <div className="flex justify-between items-center w-full mt-4">
                            <p className="text-lg">Contact: {item.contact}</p> 
                            <span className={`px-3 py-1 rounded-xl text-[16px] text-white font-bold uppercase ${item.status==='lost' ? 'bg-red-500' : 'bg-green-500'}`}>
                                {item.status}
                            </span>
                        </div>

                        <button
                            onClick={() => handleFindMatches(item._id)}
                            className="mt-3 self-start px-4 py-2 bg-[#1a3a8a] text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                        >
                            {openMatchesId === item._id ? "Hide Matches" : "🔍 Find Possible Matches"}
                        </button>

                        {openMatchesId === item._id && (
                            <div className="mt-3 border-t pt-3">
                                {loadingMatchesId === item._id ? (
                                    <p className="text-gray-500 italic">Searching for matches...</p>
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
                                                        className="w-16 h-16 object-cover rounded-lg"
                                                    />
                                                )}
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-center">
                                                        <h4 className="font-bold">{match.name}</h4>
                                                        <span className="text-xs text-gray-500">
                                                            {Math.round(match.matchScore * 100)}% match
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600">{match.desc}</p>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Contact: {match.contact}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 italic">No possible matches found yet.</p>
                                )}
                            </div>
                        )}
                    </div>  
                );
            })
            )}
        </div>
    );
}

export default ItemList;