import { Model, DataTypes, Sequelize } from 'sequelize';
// import bcrypt from 'bcrypt';

export class User extends Model {
  declare id: string;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare phone: string;
  declare kycStatus: 'pending' | 'verified' | 'rejected';
  declare createdAt: Date;
  declare updatedAt: Date;

  static initialize(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [6, 100],
          },
        },
        phone: {
          type: DataTypes.STRING,
          unique: true,
          validate: {
            is: /^[+]?[\d\s-]+$/,
          },
        },
        kycStatus: {
          type: DataTypes.ENUM('pending', 'verified', 'rejected'),
          defaultValue: 'pending',
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
        modelName: 'User',
        hooks: {
          // beforeCreate: async (user: User) => {
          //   const salt = await bcrypt.genSalt(10);
          //   user.password = await bcrypt.hash(user.password, salt);
          // },
        },
      }
    );
  }

  static associate(models: any) {
    // Define associations here if needed
  }
}