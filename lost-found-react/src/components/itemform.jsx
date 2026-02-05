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
        <form className="bg-[#b4cbf0] p-8 rounded-xl flex flex-col  w-full max-w-sm shadow-sm" onSubmit={handleSubmit}>
            <h2 className="text-[#3b8bf6] text-2xl font-semibold self-start mb-2 font-[Gill_Sans,Gill_Sans_MT,Calibri,sans-serif]">Fill Item Information :</h2>
            <input type="text" placeholder="Item Name"  value={name} className=" bg-white w-full border-[2.5px] border-[rgb(161,154,200)]  text-base h-10 pl-2 my-2  rounded-lg" onChange={(e) => setName(e.target.value)} required/><br/>
            <input type="text" placeholder="Item Description" value={desc} className=" bg-white w-full border-[2.5px] border-[rgb(161,154,200)]  text-base h-10 pl-2 my-2  rounded-lg" onChange={(e) => setDesc(e.target.value)} required/><br/>
            <input type="text" placeholder="Contact Information"value={contact} className=" bg-white w-full border-[2.5px] border-[rgb(161,154,200)]  text-base h-10 pl-2 my-2 rounded-lg" onChange={(e) => setContact(e.target.value)}  required/><br/>
            <label
  htmlFor="upload-image"
  className="inline-block
px-[15px] py-[10px]
bg-white
text-blue-900
text-base
border-[2.5px] border-[rgb(145,140,172)]
rounded-lg
cursor-pointer
text-center
hover:bg-blue-900
hover:text-white transition-colors duration-300
"
>
  Upload Image
</label>

<input
  id="upload-image"
  type="file"
  accept="image/*"
  className="hidden"
  onChange={(e) => setImg(e.target.files[0])}
/>
<br/>
            <select value={status} className=" bg-white rounded-lg w-1/2 border-[2.5px] border-[rgb(145,140,172)] my-2 h-10 pl-12 text-[1.2rem] text-blue-900 " onChange={(e) => setStatus(e.target.value)}>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
            </select><br/>
            <button type="submit" className=" bg-white rounded-lg w-1/2 border-[2.5px] border-[rgb(145,140,172)] my-2 h-10  text-[1.2rem] text-blue-900 hover:bg-blue-900
hover:text-white transition-colors duration-300">{props.editingItem ? "Update Item" : "Add Item"}</button>
        </form>
    );
}

export default ItemForm;