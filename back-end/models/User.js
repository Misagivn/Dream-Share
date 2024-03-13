const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'dream-share',
});

class User {
  static async getUserByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async createUser(email, password) {
    const hash = await bcrypt.hash(password, 10);
    const result = await pool.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash]);
    return result[0].insertId;
  }

  static async comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  static async deleteUser(userId) {
    await pool.execute('DELETE FROM users WHERE id = ?', [userId]);
  }
}

module.exports = User;