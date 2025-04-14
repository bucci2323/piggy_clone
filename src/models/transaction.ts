import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from '../models/User';
import { Wallet } from '../models/wallet'; 

export const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
  },
}, {
  tableName: 'transactions',
  timestamps: true,
});

// Relationships
User.hasMany(Transaction);
Transaction.belongsTo(User);
Wallet.hasMany(Transaction);
Transaction.belongsTo(Wallet);

export default Transaction;
