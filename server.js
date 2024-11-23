// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
const { configDotenv } = require('dotenv');

// Initialize Express App
const app = express();

configDotenv()

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/todos', taskRoutes);
app.get('/',(req,res)=>{
  res.send("Alive");
})

// Database Connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
