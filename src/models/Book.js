const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
  bookId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'book_id'
  },
  isbn: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  pubYear: {
    type: DataTypes.INTEGER,
    field: 'pub_year'
  },
  publisher: {
    type: DataTypes.STRING(255)
  },
  language: {
    type: DataTypes.STRING(50)
  }
}, {
  tableName: 'books',
  timestamps: false
});

module.exports = Book;
