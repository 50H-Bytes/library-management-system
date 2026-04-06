const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reservation = sequelize.define('Reservation', {
  reservationId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'reservation_id'
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
  reservedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'reserved_at'
  },
  expiresAt: {
    type: DataTypes.DATE,
    field: 'expires_at'
  },
  status: {
    type: DataTypes.ENUM('active', 'cancelled', 'fulfilled'),
    defaultValue: 'active'
  }
}, {
  tableName: 'reservations',
  timestamps: false
});

module.exports = Reservation;
