import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class Wallet extends Model {
  public id!: string;
  public userId!: string;
  public currency!: 'NGN' | 'USD';
  public balance!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Wallet.init(
  {
    id: { 
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true 
    },
    userId: { 
      type: DataTypes.UUID, 
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    currency: { 
      type: DataTypes.ENUM('NGN', 'USD'), 
      allowNull: false 
    },
    balance: { 
      type: DataTypes.DECIMAL(15, 2), 
      defaultValue: 0.0,
      validate: {
        min: 0
      }
    },
  },
  { sequelize, modelName: 'Wallet' }
);

Wallet.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Wallet, { foreignKey: 'userId' });

export default Wallet;