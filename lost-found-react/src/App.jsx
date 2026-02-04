import {useState} from 'react';
import Header from './components/header.jsx';
import ItemForm from './components/itemform.jsx';
import ItemList from './components/itemlist.jsx';

function App(){
  const [items , setItems] = useState([]);
  const [editingItem , setEditingItem] = useState(null);
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
       <h1>React version of lost-and-found-app started.</h1>
       <Header />
       <ItemForm onAddItem={addItem} editingItem={editingItem} onUpdateItem={handleUpdateItem}/>
       <ItemList items={items} onDeleteItem={handleDelete} onEditItem={handleEdit}/>

    </div>
    
  )
}
export default App;