import express from "express";
import cors from "cors";
import itemsRoutes from "./routes/items.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(itemsRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});