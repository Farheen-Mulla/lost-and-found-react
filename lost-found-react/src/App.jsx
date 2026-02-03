import Header from './components/header.jsx';
import ItemForm from './components/itemform.jsx';
import ItemList from './components/itemlist.jsx';

function App(){
  return(
    <div>
       <h1>React version of lost-and-found-app started.</h1>
       <Header />
       <ItemForm />
       <ItemList />

    </div>
    
  )
}
export default App;