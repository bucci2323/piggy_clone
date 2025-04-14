import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from '../models/User';  

export const Wallet = sequelize.define('Wallet', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
  },
}, {
  tableName: 'wallets', 
  timestamps: true,
});

User.hasOne(Wallet);
Wallet.belongsTo(User);

export default Wallet;
