import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from '../models/User';

export const SavingsPlan = sequelize.define('SavingsPlan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('PIGGYBANK', 'SAFELOCK', 'TARGET'),
    allowNull: false,
  },
  targetAmount: {
    type: DataTypes.FLOAT,
    allowNull: true, // Optional for PiggyBank
  },
  currentAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
  },
  interestRate: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
  },
  lockPeriod: {
    type: DataTypes.INTEGER, // in days
    allowNull: true, // Required for Safelock
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true, // Optional for PiggyBank
  },
  status: {
    type: DataTypes.ENUM('ACTIVE', 'COMPLETED', 'WITHDRAWN'),
    allowNull: false,
    defaultValue: 'ACTIVE',
  },
  autoSave: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  autoSaveAmount: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  autoSaveFrequency: {
    type: DataTypes.ENUM('DAILY', 'WEEKLY', 'MONTHLY'),
    allowNull: true,
  },
}, {
  tableName: 'savings_plans',
  timestamps: true,
});

// Relationships
User.hasMany(SavingsPlan);
SavingsPlan.belongsTo(User);

export default SavingsPlan; 