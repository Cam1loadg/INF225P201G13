const router = require('express').Router();
let User = require('../Models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
      const { name, rut, password, cargo } = req.body;
  
      const existingUser = await User.findOne({ rut });
      if (existingUser) {
        return res.status(401).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({ name, rut, password: hashedPassword, cargo });
      await newUser.save();

      const savedUser = await User.findOne({ rut });
  
      res.status(201).json({ message: 'User registered successfully', userId: savedUser._id });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const { rut, password } = req.body;
  
      const user = await User.findOne({ rut });
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

  router.route('/:id').delete(async (req, res) => {
    await User.findByIdAndRemove(req.params.id)
    .then(() => res.json({message: 'Usuario eliminado correctamente.'}))
    .catch(err => res.status(400).json('Error: ' + err));
  });

  module.exports = router;