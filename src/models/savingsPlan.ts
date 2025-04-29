import { DataTypes, Model, Sequelize } from 'sequelize';
import { User } from './user';
import { Wallet } from './wallet';

export class SavingsPlan extends Model {
  declare id: string;
  declare userId: string;
  declare walletId: string;
  declare name: string;
  declare amount: number;
  declare frequency: 'daily' | 'weekly' | 'monthly';
  declare isActive: boolean;
  declare nextDeduction: Date;
  declare createdAt: Date;
  declare updatedAt: Date;

  static initialize(sequelize: Sequelize) {
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
        },
        walletId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: Wallet,
            key: 'id',
          },
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        amount: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: false,
          validate: {
            min: 100, // Minimum savings amount
          },
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
        modelName: 'SavingsPlan',
      }
    );
  }

  static associate(models: any) {
    SavingsPlan.belongsTo(models.User, { foreignKey: 'userId' });
    SavingsPlan.belongsTo(models.Wallet, { foreignKey: 'walletId' });
    models.User.hasMany(SavingsPlan, { foreignKey: 'userId' });
    models.Wallet.hasMany(SavingsPlan, { foreignKey: 'walletId' });
  }
}