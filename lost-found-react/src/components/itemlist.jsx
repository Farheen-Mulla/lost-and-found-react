function ItemList(){
    const items = [
    {
    name: "Blue Bottle",
    desc: "Steel bottle",
    contact: "john@gmail.com",
    status: "lost",
    },
    {
    name: "Grey Wallet",
    desc: "Leather wallet",
    contact: "alice@gmail.com",
    status: "found",
    }
 ];
 return (
    <div>
        <h2>Items List</h2>
        {items.map((item,index) => (
            <div key={index}> 
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <p>Contact: {item.contact}</p>
                <span>{item.status}</span>
            </div>  
        ))}
    </div>
 );
}
export default ItemList;