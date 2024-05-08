const router = require('express').Router();
let User = require('../Models/user-model');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try {
      const { name, rut, password, cargo } = req.body;
  
      const existingUser = await User.findOne({ rut });
      if (existingUser) {
        return res.status(201).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({ name, rut, password: hashedPassword, cargo });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;