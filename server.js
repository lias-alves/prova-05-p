const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const session = require('express-session');
const routes = require('./routes/routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

// Configurar sessão
app.use(session({
    secret: 'meu_segredo_super_seguro123',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // secure: true se for usar https
}));

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

app.use('/', routes);

app.listen(3000,()=>console.log('Servidor rodando em http://localhost:3000'));