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

  const handleAddAndRedirect = async (newItem) => {
    try{
       const formData = new FormData();

       formData.append("name",newItem.name);
       formData.append("desc",newItem.desc);
       formData.append("contact",newItem.contact);
       formData.append("status",newItem.status);
       formData.append("image",newItem.image);

       const token = 
       localStorage.getItem("token");

       const res = await fetch(
        "https://lost-found-backend-ajdo.onrender.com/api/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
       );

       const data = await res.json();
       console.log("response from backend:", data);
       
       if(!res.ok){
        throw new Error(data.message || "Failed to submit item");
       }
     
       await reloadItems(); // Refresh the list after adding
       alert("Item submitted successfully!");
       navigate("/items");
       
  }catch(err) {
    console.error("Failed to submit:", err);
    alert("Failed to submit item. Check console.");
  }
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
