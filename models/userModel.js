const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'meu_banco'
});

async function createUser(username, password) {
    const hash = await bcrypt.hash(password, 10);
    await db.query(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hash]
    );
}

async function loginUser(username, password) {
    console.log(`Tentando logar o usuário: ${username}`);
    const [rows] = await db.query(
        'SELECT * FROM users WHERE username = ?',
        [username]
    );

    console.log(`Total de usuários encontrados com esse nome: ${rows.length}`);
    if (rows.length === 0) return false;

    console.log(`Hash armazenado no banco: ${rows[0].password}`);
    const valid = await bcrypt.compare(password, rows[0].password);
    console.log(`Bcrypt validation result: ${valid}`);

    return valid;
}

module.exports = { createUser, loginUser };