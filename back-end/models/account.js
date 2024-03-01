const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  street: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  apartment: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  zip: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  city: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  country: {
    type: DataTypes.STRING,
    defaultValue: ''
  }
});

module.exports = { User };