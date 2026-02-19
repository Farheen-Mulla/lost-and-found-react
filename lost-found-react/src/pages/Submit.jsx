import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import ItemForm from "../components/ItemForm";

export default function Submit({reloadItems, isLoggedIn, onLogout}) {
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLoggedIn){
      alert("You must be logged in to report an item.");
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleAddAndRedirect = (newItem) => {
    const payload = {
      id:newItem.id,
      name:newItem.name,
      desc:newItem.desc,
      contact:newItem.contact,
      status:newItem.status
    };
    fetch("http://localhost:5000/api/items", {
      method: "POST",
      headers: {"Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {console.log("Response from backend:", data);
    reloadItems(); // Refresh the list after adding
    alert("Item submitted successfully!");
    navigate("/items")
  })
  .catch(err => {
    console.error("Failed to submit:", err);
    alert("Failed to submit item. Check console.");
  });
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
