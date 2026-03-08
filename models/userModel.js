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
  const [rows] = await db.query(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );

  if (rows.length === 0) return false;

  const bcrypt = require('bcrypt');

  const valid = await bcrypt.compare(password, rows[0].password);

  return valid;
}

module.exports = { createUser, loginUser };