import mongoose from "mongoose";
const itemSchema = new mongoose.Schema({
    name: String,
    desc: String,
    status: String,
    contact: String,
    image: String
} , {timestamp: true});

export default mongoose.model("Item",itemSchema);