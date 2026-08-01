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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    // NEW: stores the AI-generated embedding (a list of numbers)
    // representing the meaning of this item's name + description.
    // Used to find similar lost/found items automatically.
    embedding: {
        type: [Number],
        default: [],
    },
} , {timestamps: true});

export default mongoose.model("Item",itemSchema);