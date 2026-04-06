const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BookCopy = sequelize.define('BookCopy', {
  copyId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'copy_id'
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'book_id'
  },
  condition: {
    type: DataTypes.ENUM('excellent', 'good', 'fair', 'poor'),
    defaultValue: 'good'
  },
  status: {
    type: DataTypes.ENUM('available', 'loaned', 'reserved', 'damaged'),
    defaultValue: 'available'
  },
  addedDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'added_date'
  }
}, {
  tableName: 'book_copies',
  timestamps: false
});

module.exports = BookCopy;
