const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BookAuthor = sequelize.define('BookAuthor', {}, {
  tableName: 'book_authors',
  timestamps: false
});

module.exports = BookAuthor;
