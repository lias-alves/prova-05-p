const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', authRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});