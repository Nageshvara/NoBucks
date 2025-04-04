const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const Product = require("./models/Product.js")

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://nagaesvara:Nagesh%40nob25@shoppingcart.eoeqd46.mongodb.net/NoBucks")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
});

app.get("/api/products/:id", async (req, res) => {
    const { id } = req.params; 
  
    try {

      const product = await Product.findById(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
