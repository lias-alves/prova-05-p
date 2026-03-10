const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const eventController = require('../controllers/eventController');

// Middleware para verificar se está logado
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    return res.redirect('/login');
};

// AUTH
router.get('/', (req,res) => res.redirect('/login'));
router.get('/login', authController.showLogin);
router.get('/register', authController.showRegister);
router.get('/logout', authController.logout);

router.post('/register', authController.register);
router.post('/login', authController.login);

// EVENTOS - Protegidas com middleware
router.get('/home', isAuthenticated, eventController.home);
router.post('/evento', isAuthenticated, eventController.create);
router.get('/delete/:id', isAuthenticated, eventController.delete);
router.get('/search', isAuthenticated, eventController.search);
router.get('/eventos', isAuthenticated, eventController.eventos);

module.exports = router;