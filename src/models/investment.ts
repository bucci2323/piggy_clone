import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import {User , Wallet} from '../models';

class Investment extends Model {
  public id!: string;
  public userId!: string;
  public walletId!: string;
  public planName!: string;
  public amount!: number;
  public expectedReturn!: number;
  public startDate!: Date;
  public endDate!: Date;
  public status!: 'active' | 'completed' | 'cancelled';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Investment.init(
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
    planName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    expectedReturn: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'completed', 'cancelled'),
      defaultValue: 'active',
    },
  },
  {
    sequelize,
    modelName: 'Investment',
    tableName: 'investments',
  }
);

// Define associations
Investment.belongsTo(User, { foreignKey: 'userId' });
Investment.belongsTo(Wallet, { foreignKey: 'walletId' });
User.hasMany(Investment, { foreignKey: 'userId' });
Wallet.hasMany(Investment, { foreignKey: 'walletId' });

export default Investment; 