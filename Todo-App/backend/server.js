const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/todo_app", {
  useNewUrlParser: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error(err));

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!'); // Response bhejna
});

const todoRoutes = require("./todoRoutes");
app.use("/api/todos", todoRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
