const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(express.json())
app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

const userSchema = new mongoose.Schema({
    name: String,
    email: {
      type: String,
      unique: true
    },
    pass: String,
    age: Number,
    employment: String,
    phone: String
  });
  
  const User = mongoose.model('User', userSchema);
  
  app.post('/auth/register', async (req, res) => {
    try{
      const userData = req.body;
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    }catch (error){
      console.error('Error registering user:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  /*
  app.post('/auth/login', async (req, res) => {
    try {
      const { email, pass } = req.body;
      const user = await User.findOne({ email, pass });
      
      if (user) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  */
 