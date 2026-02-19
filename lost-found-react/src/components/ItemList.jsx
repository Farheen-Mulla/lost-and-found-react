import { useState } from 'react';

function ItemList({ items, onDeleteItem, onEditItem }) {
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const toggleMenu = (index) => {
        setOpenMenuIndex(openMenuIndex === index ? null : index);
    };

    return (
        <div className="p-4 bg-[#b4cbf0] h-[30rem] overflow-y-auto w-[50rem] border-4 border-[#1e3985] rounded-lg">
            <h2 className="text-[2rem] text-blue-500 font-['Gill_Sans',...sans-serif] h-8 my-6 mt-0 pt-4 pl-4">Items List</h2>
            
            {items.length === 0 ? (
                <p className="text-center text-gray-600 text-xl mt-10">No items to display</p>
            ) : (
                items.map((item, index) => (
                    <div key={item.id} className="relative min-h-[6rem] w-full bg-white p-4 rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.35)] my-4 flex flex-col"> 
                        
                        <div className="flex justify-between items-start">
                            <h3 className="text-2xl font-bold">{item.name}</h3>
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
                                            onClick={() => { onDeleteItem(item.id); setOpenMenuIndex(null); }}
                                            className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 font-bold">
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {item.img && item.img instanceof File && (
                            <img src={URL.createObjectURL(item.img)} alt={item.name} className="w-[150px] h-[150px] object-cover rounded-lg mb-2" />
                        )}
                        
                        <p className="text-xl text-gray-700">{item.desc}</p>
                        
                        <div className="flex justify-between items-center w-full mt-4">
                            <p className="text-lg">Contact: {item.contact}</p> 
                            <span className={`px-3 py-1 rounded-xl text-[16px] text-white font-bold uppercase ${item.status==='lost' ? 'bg-red-500' : 'bg-green-500'}`}>
                                {item.status}
                            </span>
                        </div>
                    </div>  
                ))
            )}
        </div>
    );
}

export default ItemList;