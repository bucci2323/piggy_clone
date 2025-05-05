import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import {User , Wallet} from '../models';

class SavingsPlan extends Model {
  public id!: string;
  public userId!: string;
  public walletId!: string;
  public name!: string;
  public amount!: number;
  public frequency!: 'daily' | 'weekly' | 'monthly';
  public isActive!: boolean;
  public nextDeduction!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SavingsPlan.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    frequency: {
      type: DataTypes.ENUM('daily', 'weekly', 'monthly'),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    nextDeduction: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'SavingsPlan',
    tableName: 'savings_plans',
  }
);

// Define associations
SavingsPlan.belongsTo(User, { foreignKey: 'userId' });
SavingsPlan.belongsTo(Wallet, { foreignKey: 'walletId' });
User.hasMany(SavingsPlan, { foreignKey: 'userId' });
Wallet.hasMany(SavingsPlan, { foreignKey: 'walletId' });

export default SavingsPlan; 