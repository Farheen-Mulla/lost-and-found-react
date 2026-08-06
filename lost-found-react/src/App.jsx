import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Submit from "./pages/Submit";
import Items from "./pages/Items";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [items, setItems] = useState([]);
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const [isLoggedIn , setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  
  const loadItems = async () => {
  setIsLoadingItems(true);
  try {
    const res = await fetch("https://lost-found-backend-ajdo.onrender.com/api/items");

    if (!res.ok) {
      throw new Error("Failed to fetch items");
    }

    const data = await res.json();
    setItems(data);

  } catch (err) {
    console.error("Error fetching items:", err);
  } finally {
    setIsLoadingItems(false);
  }
};

const handleDeleteItem = async (id) => {
  try {
    const token = localStorage.getItem("token");

    console.log("Delete Token:", token);

    const res = await fetch(
      `https://lost-found-backend-ajdo.onrender.com/api/items/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Delete Status:", res.status);

    if (!res.ok) {
      const data = await res.json();
      console.log("Delete Error:", data);
      throw new Error(data.message);
    }

    await loadItems();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const handleUpdateItem = async (updatedItem) => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", updatedItem.name);
    formData.append("desc", updatedItem.desc);
    formData.append("contact", updatedItem.contact);
    formData.append("status", updatedItem.status);

    if (updatedItem.image) {
      formData.append("image", updatedItem.image);
    }

    const res = await fetch(
      `https://lost-found-backend-ajdo.onrender.com/api/items/${updatedItem._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error("Failed to update item");
    }

    await loadItems();
  } catch (err) {
    console.error(err);
    alert("Failed to update item.");
  }
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
      <Route path="/register" element={<Register />} />
      


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
            isLoadingItems={isLoadingItems}
            onDeleteItem={handleDeleteItem}
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