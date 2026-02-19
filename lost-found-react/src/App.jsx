// import { useState, useEffect } from "react";
// import { Routes, Route } from "react-router-dom";

// import Landing from "./pages/Landing";
// import Submit from "./pages/Submit";
// import Items from "./pages/Items";
// import Login from "./pages/Login";

// function App() {
//   const [items,setItems] = useState([]);
//   useEffect(() =>{
//     fetch("http://localhost:5000/api/items")
//       .then(res => res.json())
//       .then(data => setItems(data));
//   }, []);


//  const [isLoggedIn , setIsLoggedIn] = useState(() => {
//    return localStorage.getItem("isLoggedIn") === "true";
//  });

//  const handleLogin = () => {
//   setIsLoggedIn(true);
//   localStorage.setItem("isLoggedIn", "true");
//  };

//  const handleLogout = () => {
//   setIsLoggedIn(false);
//   localStorage.setItem("isLoggedIn", "false");
//  };


//   function addItem(newItem) {
//     // Ensure the image is stripped before adding to state if you want strictly persistent text
//     // Or keep it in state for the current session
//     setItems(prev => [newItem, ...prev]);
//   }

//   function handleDelete(id) {
//     setItems(prev => prev.filter(item => item.id !== id));
//   }

//   function handleUpdateItem(updatedItem) {
//     setItems(prev =>
//       prev.map(item => (item.id === updatedItem.id ? updatedItem : item))
//     );
//   }

//   return (
//     <Routes>
//       <Route path="/" element={<Landing />} />

//       <Route path="/login" element={<Login onLogin={handleLogin} />} />

//       <Route 
//         path="/submit" 
//         element={<Submit addItem={addItem} isLoggedIn={isLoggedIn} onLogout={handleLogout}/>} 
//       />

//       <Route 
//         path="/items" 
//         element={
//           <Items 
//             items={items}
//             setItems={setItems}
//             onDeleteItem={handleDelete}
//             onUpdateItem={handleUpdateItem}
//             isLoggedIn={isLoggedIn}
//             onLogout={handleLogout}
//           />
//         } 
//       />

      
//     </Routes>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Submit from "./pages/Submit";
import Items from "./pages/Items";
import Login from "./pages/Login";

function App() {
  const [items, setItems] = useState([]);
  const [isLoggedIn , setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // Load items from backend
  const loadItems = () => {
    fetch("http://localhost:5000/api/items")
      .then(res => res.json())
      .then(data => setItems(data));
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
  };

  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login onLogin={handleLogin} />} />

      <Route 
        path="/submit" 
        element={
          <Submit 
            reloadItems={loadItems}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
          />
        } 
      />

      <Route 
        path="/items" 
        element={
          <Items 
            items={items}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
          />
        } 
      />
    </Routes>
  );
}

export default App;