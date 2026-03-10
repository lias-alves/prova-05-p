const express = require('express');
const router = express.Router();

const eventController = require('../controllers/eventController');

router.get('/home', eventController.home);

router.post('/evento', eventController.create);

router.get('/delete/:id', eventController.delete);

router.get('/search', eventController.search);

module.exports = router;