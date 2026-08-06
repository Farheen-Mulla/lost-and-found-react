import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import ItemList from "../components/ItemList";
import ItemForm from "../components/ItemForm";

export default function Items({
  items,
  isLoadingItems,
  onDeleteItem,
  onUpdateItem,
  isLoggedIn,
  onLogout
}) {
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchStatus, setSearchStatus] = useState("all");
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === "" && searchStatus === "all") {
      setSearchResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery.trim()) params.append("q", searchQuery.trim());
        if (searchStatus !== "all") params.append("status", searchStatus);

        const res = await fetch(
          `https://lost-found-backend-ajdo.onrender.com/api/items/search?${params.toString()}`
        );

        if (!res.ok) throw new Error("Search failed");

        const data = await res.json();
        setSearchResults(data);
      } catch (err) {
        console.error("Search error:", err);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 400); 

  
    return () => clearTimeout(timer);
  }, [searchQuery, searchStatus]);

  const displayedItems = searchResults !== null ? searchResults : items;

  function handleEdit(item) {
    if (!isLoggedIn) {
      alert("Please log in to edit items.");
      navigate("/login");
      return;
    }
    setEditingItem(item);
  }

  function handleUpdate(updatedItem) {
    onUpdateItem(updatedItem);
    setEditingItem(null);
  }

  const handleSearchAttempt = (value) => {
    if (!isLoggedIn) {
      if (value !== "") {
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
      <div className="flex flex-col items-center gap-8 py-10 min-h-screen">

        {editingItem && (
          <div className="w-full flex justify-center">
            <ItemForm
              editingItem={editingItem}
              onUpdateItem={handleUpdate}
            />
          </div>
        )}

        {isSearching && (
          <p className="text-blue-700 italic">Searching...</p>
        )}

        <ItemList
          items={displayedItems}
          isLoading={isLoadingItems}
          onDeleteItem={onDeleteItem}
          onEditItem={handleEdit}
        />
      </div>
    </AppLayout>
  );
}