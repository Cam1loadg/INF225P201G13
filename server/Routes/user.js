const router = require('express').Router();
let User = require('../Models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
      const { name, rut, password, cargo } = req.body;
      let query = {rut: rut.toString()}
      const existingUser = await User.findOne(query);
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

  router.post('/login', async (req, res) => {
    try {
      const { rut, password } = req.body;
      let query = {rut: rut.toString()}
      const user = await User.findOne(query);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user._id, name: user.name}, 'thegame', { expiresIn: '1h' });
  
      res.status(200).json({ message: 'Login successful', token});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;