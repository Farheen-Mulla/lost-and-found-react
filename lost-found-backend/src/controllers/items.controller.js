import Item from "../models/Item.js";

export const getItems = async (req, res) => {
  try{
    const items =await
    Item.find().sort({createdAt:-1});
    res.json(items);
  }catch(error){
    res.status(500).json({message:"Failed to fetch items"})
  }
};

export const deleteItem = async (req,res) => {
  try{
    await
    Item.findByIdAndDelete(req.params.id);
    res.json({
      message: "Item deleted successfully"
    });
  } catch(error){
    res.status(500).json({
      message: "Failed to delete item"
    });
  }
};