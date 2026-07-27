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
} , {timestamps: true});

export default mongoose.model("Item",itemSchema);