const { createUser, loginUser } = require('../models/userModel');

exports.showLogin = (req,res) => res.render('login');
exports.showRegister = (req,res) => res.render('register');

exports.register = async (req,res) => {
    const { username, password } = req.body;
    await createUser(username,password);
    res.redirect('/login');
};

exports.login = async (req,res) => {
    const { username, password } = req.body;
    const valid = await loginUser(username,password);

    if(valid){
        // Salva os dados do usuário na sessão
        req.session.user = { username };
        res.redirect('/home');
    } else {
        res.send('Usuário ou senha inválidos');
    }
};

// Adiciona função de logout
exports.logout = (req,res) => {
    req.session.destroy();
    res.redirect('/login');
};