import mongoose from "mongoose";
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["lost", "found"],
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
} , {timestamps: true});

export default mongoose.model("Item",itemSchema);