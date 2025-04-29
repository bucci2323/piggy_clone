import { DataTypes, Model, Sequelize } from 'sequelize';
import { User } from './user';
import { Wallet } from './wallet';

export class Investment extends Model {
  declare id: string;
  declare userId: string;
  declare walletId: string;
  declare planName: string;
  declare amount: number;
  declare expectedReturn: number;
  declare startDate: Date;
  declare endDate: Date;
  declare status: 'active' | 'completed' | 'cancelled';
  declare createdAt: Date;
  declare updatedAt: Date;

  static initialize(sequelize: Sequelize) {
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
        },
        walletId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: Wallet,
            key: 'id',
          },
        },
        planName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        amount: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: false,
          validate: {
            min: 1000, // Minimum investment amount
          },
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
          validate: {
            isAfterStartDate(value: Date) {
              // if (value <= this.startDate) {
              //   throw new Error('End date must be after start date');
              // }
            },
          },
        },
        status: {
          type: DataTypes.ENUM('active', 'completed', 'cancelled'),
          defaultValue: 'active',
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Investment',
      }
    );
  }

  static associate(models: any) {
    Investment.belongsTo(models.User, { foreignKey: 'userId' });
    Investment.belongsTo(models.Wallet, { foreignKey: 'walletId' });
    models.User.hasMany(Investment, { foreignKey: 'userId' });
    models.Wallet.hasMany(Investment, { foreignKey: 'walletId' });
  }
}