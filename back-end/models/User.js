const mysql = require('mysql2/promise'); // Sử dụng mysql2/promise để có thể sử dụng promise

const config = require('../config/db');

const pool = mysql.createPool(config.db);

class User {
  static async findByCredentials(username, password) {
    try {
      const connection = await pool.getConnection();
      const [rows, fields] = await connection.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
      connection.release(); // Giải phóng kết nối sau khi sử dụng
      if (rows.length > 0) {
        return rows[0];
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      throw error; // Ném lại lỗi để xử lý ở tầng trên
    }
  }

  static async create(userData) {
    try {
      const connection = await pool.getConnection();
      await connection.execute('INSERT INTO users SET ?', userData);
      connection.release(); // Giải phóng kết nối sau khi sử dụng
    } catch (error) {
      throw error; // Ném lại lỗi để xử lý ở tầng trên
    }
  }
}

module.exports = User;