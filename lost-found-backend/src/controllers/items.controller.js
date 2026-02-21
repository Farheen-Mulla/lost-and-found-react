let items = [];

export const getItems = (req, res) => {
  res.json(items);
};

export const addItem = (req, res) => {
  console.log("FROM REACT:", req.body);
  const newItem = req.body;
  items.push(newItem);
  res.json({ message: "Item added", item: newItem });
};