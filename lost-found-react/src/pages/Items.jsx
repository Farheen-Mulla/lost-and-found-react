// import { useState, useEffect } from "react";
// import AppLayout from "../layouts/AppLayout";
// import ItemList from "../components/itemlist";

// export default function Items() {
//   const [items, setItems] = useState([]);
//   const [editingItem, setEditingItem] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchStatus, setSearchStatus] = useState("all");

//   // Load from localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem("items");
//     if (saved) {
//       setItems(JSON.parse(saved));
//     }
//   }, []);

//   // Save to localStorage (without images)
//   useEffect(() => {
//     const itemsWithoutImages = items.map(({ img, ...rest }) => rest);
//     localStorage.setItem("items", JSON.stringify(itemsWithoutImages));
//   }, [items]);

//   // Filter logic
//   const filteredItems = items.filter(item => {
//     const matchesQuery =
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.status.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesStatus =
//       searchStatus === "all" || item.status === searchStatus;

//     return matchesQuery && matchesStatus;
//   });

//   // Delete
//   function handleDelete(index) {
//     setItems(items.filter((_, i) => i !== index));
//   }

//   // Edit
//   function handleEdit(item) {
//     setEditingItem(item);
//   }

//   // Update
//   function handleUpdateItem(updatedItem) {
//     setItems(
//       items.map(item =>
//         item.id === updatedItem.id ? updatedItem : item
//       )
//     );
//     setEditingItem(null);
//   }

//   return (
//     <AppLayout
//       searchQuery={searchQuery}
//       onSearchChange={setSearchQuery}
//       searchStatus={searchStatus}
//       onStatusChange={setSearchStatus}
//     >
//       <ItemList
//         items={filteredItems}
//         onDeleteItem={handleDelete}
//         onEditItem={handleEdit}
//       />
//     </AppLayout>
//   );
// }

// import { useState } from "react";
// import AppLayout from "../layouts/AppLayout";
// import ItemList from "../components/itemlist";

// export default function Items({
//   items,
//   setItems,
//   onDeleteItem,
//   onUpdateItem
// }) {
//   const [editingItem, setEditingItem] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchStatus, setSearchStatus] = useState("all");

//   const filteredItems = items.filter(item => {
//     const matchesQuery =
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.status.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesStatus =
//       searchStatus === "all" || item.status === searchStatus;

//     return matchesQuery && matchesStatus;
//   });

//   function handleEdit(item) {
//     setEditingItem(item);
//   }

//   return (
//     <AppLayout
//       searchQuery={searchQuery}
//       onSearchChange={setSearchQuery}
//       searchStatus={searchStatus}
//       onStatusChange={setSearchStatus}
//     >
//       <ItemList
//         items={filteredItems}
//         onDeleteItem={onDeleteItem}
//         onEditItem={handleEdit}
//       />
//     </AppLayout>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import ItemList from "../components/ItemList";
import ItemForm from "../components/ItemForm";

export default function Items({
  items,
  onDeleteItem,
  onUpdateItem,
  isLoggedIn,
  onLogout
}) {
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchStatus, setSearchStatus] = useState("all");
  const navigate = useNavigate();

  // Filter items based on search query and status
  const filteredItems = items.filter(item => {
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      searchStatus === "all" || item.status === searchStatus;

    return matchesQuery && matchesStatus;
  });

  // Called when user clicks Edit button
  function handleEdit(item) {
    if(!isLoggedIn){
      alert("Please log in to edit items.");
      navigate("/login");
      return;
    }
    setEditingItem(item);
  }

  // Called after updating an item in ItemForm
  function handleUpdate(updatedItem) {
    onUpdateItem(updatedItem);
    setEditingItem(null); // Close edit mode
  }

  const handleSearchAttempt =(value) => {
   if(!isLoggedIn){
    if(value !== ""){
     alert("Please log in to search items.");
     navigate("/login");
    }
    return;
   }
   setSearchQuery(value);
  };

  return (
    <AppLayout
      searchQuery={searchQuery}
      onSearchChange={handleSearchAttempt}
      searchStatus={searchStatus}
      onStatusChange={setSearchStatus}
      isLoggedIn={isLoggedIn}
      onLogout={onLogout}
    >
      {/* ItemForm for editing items */}
      <div className="flex flex-col items-center gap-8 py-10 min-h-screen">

      {editingItem && (
        <div className="w-full flex justify-center">
          <ItemForm
          editingItem={editingItem}
          onUpdateItem={handleUpdate}
          />
        </div>
      )}

      {/* Show all items */}
      <ItemList
        items={filteredItems}
        onDeleteItem={onDeleteItem}
        onEditItem={handleEdit}
      />
      </div>
    </AppLayout>
  );
}