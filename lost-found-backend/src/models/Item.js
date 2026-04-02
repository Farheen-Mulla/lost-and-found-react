import mongoose from "mongoose";
const itemSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: String,
    contact: String,
    image: String
} , {timestamp: true});

export default mongoose.model("Item",itemSchema);