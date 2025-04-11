const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Product = require("./models/Product");
const User = require("./models/User");
const UserDetails = require("./models/UserDetails");

const app = express();
const PORT = 5000;
const JWT_SECRET = "929062008ef84654c22364e9608f5045cf2f9ab91315028e44afc35450bb64913cedddad931c0f1794b494e8781e9df337c6c775dc55aa03437834048ab6f283"; 

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://nagaesvara:Nagesh%40nob25@shoppingcart.eoeqd46.mongodb.net/NoBucks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

/* ------------------ AUTH ROUTES ------------------ */

// Register Route
app.post("/api/register", async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ message: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ message: "Login successful", token });
});

/* ------------------ AUTH MIDDLEWARE ------------------ */

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // { username: '...' }
    next();
  });
};

/* ------------------ USER DETAILS ROUTE ------------------ */

app.post("/api/userdetails", authenticateToken, async (req, res) => {
  const { email, phone, address, pincode } = req.body;

  try {
    const userDetails = new UserDetails({
      username: req.user.username,
      email,
      phone,
      address,
      pincode
    });

    await userDetails.save();
    res.status(201).json({ message: "User details saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving user details", error: err });
  }
});

/* ------------------ PRODUCT ROUTES ------------------ */

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
