const express = require('express');
const router = express.Router();

const { createUser, loginUser } = require('../models/userModel');

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  await createUser(username, password);
  res.redirect('/login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const valid = await loginUser(username, password);

  if (valid) {
    res.redirect('/home');
  } else {
    res.send('Usuário ou senha inválidos');
  }
});

router.get('/home', (req, res) => {
  res.render('home');
});

module.exports = router;