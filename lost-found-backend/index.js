import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
let items = [];
app.get("/api/items", (req, res) => {
  res.json(items);
});

app.post("/api/items", (req, res) => {
  console.log("FROM REACT:", req.body);
  const newItem = req.body;
  items.push(newItem);
  res.json({ message: "Item added", item: newItem });
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});