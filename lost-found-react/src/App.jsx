import {useState} from 'react';
import Header from './components/header.jsx';
import ItemForm from './components/itemform.jsx';
import ItemList from './components/itemlist.jsx';

function App(){
  const [items , setItems] = useState([]);
  function addItem(newItem){
    setItems(prev => [...prev , newItem]);
  }
  function handleDelete(index){
      setItems(items.filter((_ , i) => i !==index))
  }
  return(
    <div>
       <h1>React version of lost-and-found-app started.</h1>
       <Header />
       <ItemForm onAddItem={addItem}/>
       <ItemList items={items} onDeleteItem={handleDelete}/>

    </div>
    
  )
}
export default App;