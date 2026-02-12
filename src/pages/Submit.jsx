import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import ItemForm from "../components/ItemForm";

export default function Submit({addItem, isLoggedIn, onLogout}) {
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLoggedIn){
      alert("You must be logged in to report an item.");
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleAddAndRedirect = (newItem) => {
    addItem(newItem);
    alert("Item submitted successfully!");
    navigate("/items")
  };

  return (
    <AppLayout isLoggedIn={isLoggedIn} onLogout={onLogout}>
      <div className="flex flex-col items-center py-10">
        <h1 className="text-3xl font-bold mb-6 text-[#1a3a8a]">Report an Item</h1>
        {isLoggedIn ? (<ItemForm onAddItem={handleAddAndRedirect} /> ) : (<p className="text-gray-500">Please log in to submit an item.</p>)}
      </div>
    </AppLayout>
  );
}
