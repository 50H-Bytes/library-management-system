const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
  categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'category_id'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  parentId: {
    type: DataTypes.INTEGER,
    field: 'parent_id'
  }
}, {
  tableName: 'categories',
  timestamps: false
});

module.exports = Category;
