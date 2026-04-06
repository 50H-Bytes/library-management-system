const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Loan = sequelize.define('Loan', {
  loanId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'loan_id'
  },
  copyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'copy_id'
  },
  memberId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'member_id'
  },
  loanDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'loan_date'
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'due_date'
  },
  returnDate: {
    type: DataTypes.DATE,
    field: 'return_date'
  },
  status: {
    type: DataTypes.ENUM('active', 'returned', 'overdue'),
    defaultValue: 'active'
  },
  fineAmount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    field: 'fine_amount'
  }
}, {
  tableName: 'loans',
  timestamps: false
});

module.exports = Loan;
