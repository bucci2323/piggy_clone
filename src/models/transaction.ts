import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import {User , Wallet} from '../models';

class Transaction extends Model {
  public id!: string;
  public userId!: string;
  public walletId!: string;
  public type!: 'deposit' | 'withdrawal' | 'savings' | 'investment' | 'transfer';
  public amount!: number;
  public currency!: 'NGN' | 'USD';
  public status!: 'pending' | 'completed' | 'failed';
  public description!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    walletId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Wallet,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    type: {
      type: DataTypes.ENUM('deposit', 'withdrawal', 'savings', 'investment', 'transfer'),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.ENUM('NGN', 'USD'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      defaultValue: 'pending',
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
  }
);


Transaction.belongsTo(User, { foreignKey: 'userId' });
Transaction.belongsTo(Wallet, { foreignKey: 'walletId' });
User.hasMany(Transaction, { foreignKey: 'userId' });
Wallet.hasMany(Transaction, { foreignKey: 'walletId' });

export default Transaction; 