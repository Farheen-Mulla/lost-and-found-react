function ItemList({items , onDeleteItem}){
 return (
    <div>
        <h2>Items List</h2>
        {items.map((item,index) => (
            <div key={index} className="itemCard"> 
                <h3>{item.name}</h3>
                {item.img && (<img src={URL.createObjectURL(item.img)} width="150" /> )}
                <p>{item.desc}</p>
                <p>Contact: {item.contact}</p>
                <span>{item.status}</span>
                <button onClick={() => {onDeleteItem(index)}}> Delete </button>
            </div>  
        ))}
    </div>
 );
}
export default ItemList;