const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BookCategory = sequelize.define('BookCategory', {}, {
  tableName: 'book_categories',
  timestamps: false
});

module.exports = BookCategory;
