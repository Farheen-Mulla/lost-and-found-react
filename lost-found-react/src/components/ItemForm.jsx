import { useState, useEffect } from "react";

function ItemForm(props) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("lost");
  const [image, setImage] = useState(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (props.editingItem) {
      setName(props.editingItem.name);
      setDesc(props.editingItem.desc);
      setContact(props.editingItem.contact);
      setStatus(props.editingItem.status);
    }
  }, [props.editingItem]);

  async function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);

    if (!file) return;

    setIsAnalyzing(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        "https://lost-found-backend-ajdo.onrender.com/api/ai/describe",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("AI description failed");
      }

      const data = await res.json();

      if (!name) setName(data.name);
      if (!desc) setDesc(data.desc);
    } catch (err) {
      console.error("AI describe error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleSubmit(e) {
    console.log("Form Submitted");
    e.preventDefault();

    const itemData = {
      _id: props.editingItem?._id,
      name,
      desc,
      contact,
      status,
      image,
    };

    if (props.editingItem && props.onUpdateItem) {
      props.onUpdateItem(itemData);
    } else if (props.onAddItem) {
      props.onAddItem(itemData);
    }

    resetForm();
  }

  function resetForm() {
    setName("");
    setDesc("");
    setContact("");
    setStatus("lost");
    setImage(null);
  }

  return (
    <form
      className="bg-[#b4cbf0] p-8 rounded-xl flex flex-col w-full max-w-sm shadow-sm"
      onSubmit={handleSubmit}
    >
      <h2 className="text-[#3b8bf6] text-2xl font-semibold self-start mb-2">
        Fill Item Information:
      </h2>

      <label
        htmlFor="upload-image"
        className="inline-block px-[15px] py-[10px] bg-white text-blue-900 text-base border-[2.5px] border-[rgb(145,140,172)] rounded-lg cursor-pointer hover:bg-blue-900 hover:text-white transition-colors duration-300"
      >
        Upload Image
      </label>

      <input
        id="upload-image"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      {isAnalyzing && (
        <p className="text-sm text-blue-700 italic my-1">
          Analyzing image, filling in details...
        </p>
      )}

      <input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-white w-full border-[2.5px] border-[rgb(161,154,200)] text-base h-10 pl-2 my-2 rounded-lg"
        required
      />

      <input
        type="text"
        placeholder="Item Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="bg-white w-full border-[2.5px] border-[rgb(161,154,200)] text-base h-10 pl-2 my-2 rounded-lg"
        required
      />

      <input
        type="text"
        placeholder="Contact Information"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        className="bg-white w-full border-[2.5px] border-[rgb(161,154,200)] text-base h-10 pl-2 my-2 rounded-lg"
        required
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="bg-white rounded-lg w-1/2 border-[2.5px] border-[rgb(145,140,172)] my-2 h-10 pl-12 text-[1.2rem] text-blue-900"
      >
        <option value="lost">Lost</option>
        <option value="found">Found</option>
      </select>

      <button
        type="submit"
        className="bg-white rounded-lg w-1/2 border-[2.5px] border-[rgb(145,140,172)] my-2 h-10 text-[1.2rem] text-blue-900 hover:bg-blue-900 hover:text-white transition-colors duration-300"
      >
        {props.editingItem ? "Update Item" : "Add Item"}
      </button>
    </form>
  );
}

export default ItemForm;