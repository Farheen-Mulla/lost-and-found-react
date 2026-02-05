import {useState} from 'react';
import Header from './components/header.jsx';
import ItemForm from './components/itemform.jsx';
import ItemList from './components/itemlist.jsx';
import Footer from './components/footer.jsx';

function App(){
  const [items , setItems] = useState([]);
  const [editingItem , setEditingItem] = useState(null);
  const [searchQuery , setSearchQuery] = useState("");
  const[searchStatus , setSearchStatus] = useState("all");

  const filteredItems = items.filter(item => 
  { const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = searchStatus === "all" || item.status === searchStatus;

    return matchesQuery && matchesStatus;
  }
    
  );
  function addItem(newItem){
    setItems(prev => [...prev , newItem]);
  }
  function handleDelete(index){
      setItems(items.filter((_ , i) => i !==index))
  }
  function handleEdit(item){
      setEditingItem(item);
  }
  function handleUpdateItem(updatedItem){
      setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
      setEditingItem(null);
  }

  return(
    <div>
       <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} searchStatus={searchStatus} onStatusChange={setSearchStatus}/>
       <ItemForm onAddItem={addItem} editingItem={editingItem} onUpdateItem={handleUpdateItem}/>
       <ItemList items={filteredItems} onDeleteItem={handleDelete} onEditItem={handleEdit}/>
      <Footer />
    </div>
    
  )
}
export default App;