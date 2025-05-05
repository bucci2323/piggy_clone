import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user';

class Wallet extends Model {
  public id!: string;
  public userId!: string;
  public currency!: 'NGN' | 'USD';
  public balance!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Wallet.init(
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
    currency: {
      type: DataTypes.ENUM('NGN', 'USD'),
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
  },
  {
    sequelize,
    modelName: 'Wallet',
    tableName: 'wallets',
  }
);

// Define associations
Wallet.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Wallet, { foreignKey: 'userId' });

export default Wallet; 