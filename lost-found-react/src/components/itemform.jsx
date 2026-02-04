import {useState, useEffect} from 'react';
function ItemForm(props){
     const [name , setName] = useState("");
     const [desc , setDesc] = useState("");
     const [contact , setContact] = useState("");
     const [status , setStatus] = useState("lost");
     const [img , setImg] = useState(null);

     function handleSubmit(e) {
       e.preventDefault();
       const itemData = {
        id: props.editingItem ? props.editingItem.id : Date.now(),
        name,desc,contact,status,img
       };
       if(props.editingItem){
        props.onUpdateItem(itemData);
       }else{
        props.onAddItem(itemData);
       }
       resetForm();
     }
     function resetForm(){
        setName("");
        setDesc("");
        setContact("");
        setStatus("lost");
        setImg(null);
     }
     useEffect(() => {
        if(props.editingItem){
            setName(props.editingItem.name);
            setDesc(props.editingItem.desc);
            setContact(props.editingItem.contact);
            setStatus(props.editingItem.status);
            setImg(props.editingItem.img);
        }
    }, [props.editingItem]);
    return(
        <form className="itemForm" onSubmit={handleSubmit}>
            <h2>Fill Item Information :</h2>
            <input type="text" placeholder="Item Name"  value={name} onChange={(e) => setName(e.target.value)} required/><br/>
            <input type="text" placeholder="Item Description" value={desc} onChange={(e) => setDesc(e.target.value)} required/><br/>
            <input type="text" placeholder="Contact Information"value={contact} onChange={(e) => setContact(e.target.value)}  required/><br/>
            <input type="file" accept="image/*"  onChange={(e) => setImg(e.target.files[0])}/><br/>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
            </select><br/>
            <button type="submit">{props.editingItem ? "Update Item" : "Add Item"}</button>
        </form>
    );
}

export default ItemForm;