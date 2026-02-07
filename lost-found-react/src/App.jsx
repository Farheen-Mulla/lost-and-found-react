

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Submit from "./pages/Submit";
import Items from "./pages/Items";
import Login from "./pages/Login";

function App() {
  // 1. Initialize state directly from localStorage to avoid "empty flash" overwrites
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("findit_items");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse items", e);
        return [];
      }
    }
    return [];
  });

 const [isLoggedIn , setIsLoggedIn] = useState(() => {
   return localStorage.getItem("isLoggedIn") === "true";
 });

 const handleLogin = () => {
  setIsLoggedIn(true);
  localStorage.setItem("isLoggedIn", "true");
 };

 const handleLogout = () => {
  setIsLoggedIn(false);
  localStorage.setItem("isLoggedIn", "false");
 };

  // 2. Single useEffect to handle saving whenever 'items' change
  useEffect(() => {
    // We strip images because File objects cannot be stringified/saved in localStorage
    const itemsToSave = items.map(({ img, ...rest }) => rest);
    localStorage.setItem("findit_items", JSON.stringify(itemsToSave));
  }, [items]);

  function addItem(newItem) {
    // Ensure the image is stripped before adding to state if you want strictly persistent text
    // Or keep it in state for the current session
    setItems(prev => [newItem, ...prev]);
  }

  function handleDelete(id) {
    setItems(prev => prev.filter(item => item.id !== id));
  }

  function handleUpdateItem(updatedItem) {
    setItems(prev =>
      prev.map(item => (item.id === updatedItem.id ? updatedItem : item))
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login onLogin={handleLogin} />} />

      <Route 
        path="/submit" 
        element={<Submit addItem={addItem} isLoggedIn={isLoggedIn} />} 
      />

      <Route 
        path="/items" 
        element={
          <Items 
            items={items}
            setItems={setItems}
            onDeleteItem={handleDelete}
            onUpdateItem={handleUpdateItem}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
          />
        } 
      />

      
    </Routes>
  );
}

export default App;