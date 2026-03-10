const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'meu_banco'
});

async function createEvent(nome, data, hora, cep, endereco){
    await db.query(
        "INSERT INTO eventos (nome,data,hora,cep,endereco) VALUES (?,?,?,?,?)",
        [nome,data,hora,cep,endereco]
    );
}

async function getEvents(){
    const [rows] = await db.query("SELECT * FROM eventos ORDER BY data ASC");
    return rows;
}

async function deleteEvent(id){
    await db.query("DELETE FROM eventos WHERE id=?", [id]);
}

async function searchEvent(nome){
    const [rows] = await db.query(
        "SELECT * FROM eventos WHERE nome LIKE ?",
        [`%${nome}%`]
    );
    return rows;
}

module.exports = {createEvent,getEvents,deleteEvent,searchEvent};