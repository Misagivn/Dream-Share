const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isPasswordValid = await User.comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Nếu đăng nhập thành công, bạn có thể tạo một token tại đây

      res.status(200).json({ message: 'Login successful' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  register: async (req, res) => {
    const { email, password } = req.body;

    try {
      const existingUser = await User.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' });
      }

      const userId = await User.createUser(email, password);
      res.status(201).json({ message: 'User registered successfully', userId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  
};

