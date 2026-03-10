const { createEvent, getEvents, deleteEvent, searchEvent } = require('../models/eventModel');

exports.home = async (req,res)=>{
    const eventos = await getEvents();
    res.render('home',{eventos, user: req.session.user});
}

exports.create = async (req,res)=>{
    const { nome,data,hora,cep,endereco } = req.body;
    await createEvent(nome,data,hora,cep,endereco);
    res.redirect('/home');
}

exports.delete = async (req,res)=>{
    const { id } = req.params;
    await deleteEvent(id);
    res.redirect('/home');
}

exports.search = async (req,res)=>{
    const { nome } = req.query;
    const eventos = await searchEvent(nome);
    res.render('home',{eventos, user: req.session.user});
}

exports.eventos = async (req,res)=>{
    const { nome } = req.query;
    let eventos;
    if (nome) {
        eventos = await searchEvent(nome);
    } else {
        eventos = await getEvents();
    }
    res.render('eventos',{eventos, pesquisa: nome || '', user: req.session.user});
}