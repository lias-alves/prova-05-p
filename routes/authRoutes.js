
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

//eventos
const { getEvents } = require('../models/eventModel');

router.get('/home', async (req, res) => {

  const eventos = await getEvents();

  res.render('home', { eventos });

});
//fim

// Página só de eventos
router.get('/eventos', async (req,res) => {
    const { nome } = req.query;

    let eventos;
    if(nome){
        // pesquisa por nome
        const { searchEvent } = require('../models/eventModel');
        eventos = await searchEvent(nome);
    } else {
        const { getEvents } = require('../models/eventModel');
        eventos = await getEvents();
    }

    res.render('eventos', { eventos, pesquisa: nome || '' });
});
//fim

module.exports = router;
