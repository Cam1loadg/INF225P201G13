const router = require('express').Router();
let User = require('../Models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const validateRut = (rut) => {
  const regex = /^\d{1,2}\.\d{3}\.\d{3}-[\dK]$/;
  if (!regex.test(rut)) return false;

  const [rutBody, dv] = rut.split('-');
  return calculateDv(rutBody) === dv;
};

const calculateDv = (rut) => {
  const cleanRut = rut.replace(/\./g, '');
  let total = 0;
  let factor = 2;

  for (let i = cleanRut.length - 1; i >= 0; i--) {
    total += parseInt(cleanRut.charAt(i)) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }

  const remainder = total % 11;
  const dv = 11 - remainder;

  if (dv === 11) return '0';
  if (dv === 10) return 'K';
  return dv.toString();
};

router.post('/register', async (req, res) => {
    try {
      const { name, rut, password, cargo } = req.body;

      if (!validateRut(rut) || rut.length < 11) {
        return res.status(401).json({ message: 'Invalid RUT format' });
      }
      let query = {rut: rut.toString()};
      const existingUser = await User.findOne(query);
      if (existingUser) {
        return res.status(401).json({ message: 'User already exists' });
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
    let query = {rut: rut.toString()}; 
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