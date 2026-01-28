function ItemForm(){
    return(
        <div className="itemForm">
            <h2>Fill Item Information :</h2>
            <input type="text" placeholder="Item Name" required/><br/>
            <input type="text" placeholder="Item Description" required/><br/>
            <input type="text" placeholder="Contact Information" required/><br/>
            <input type="file" accept="image/*" /><br/>
            <select>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
            </select><br/>
            <button type="submit">Add Item</button>
        </div>
    );
}

export default ItemForm;