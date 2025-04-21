import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from '../models/User';

export class SavingsPlan extends Model {
  public id!: number;
  public name!: string;
  public type!: 'PIGGYBANK' | 'SAFELOCK' | 'TARGET';
  public targetAmount!: number | null;
  public currentAmount!: number;
  public interestRate!: number;
  public lockPeriod!: number | null;
  public startDate!: Date;
  public endDate!: Date | null;
  public status!: 'ACTIVE' | 'COMPLETED' | 'WITHDRAWN';
  public autoSave!: boolean;
  public autoSaveAmount!: number | null;
  public autoSaveFrequency!: 'DAILY' | 'WEEKLY' | 'MONTHLY' | null;
  public userId!: number;
}

SavingsPlan.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  type: {
    type: DataTypes.ENUM('PIGGYBANK', 'SAFELOCK', 'TARGET'),
    allowNull: false,
    validate: {
      isIn: [['PIGGYBANK', 'SAFELOCK', 'TARGET']]
    }
  },
  targetAmount: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  currentAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
    validate: {
      min: 0
    }
  },
  interestRate: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
    validate: {
      min: 0,
      max: 1
    }
  },
  lockPeriod: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1
    }
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('ACTIVE', 'COMPLETED', 'WITHDRAWN'),
    allowNull: false,
    defaultValue: 'ACTIVE',
    validate: {
      isIn: [['ACTIVE', 'COMPLETED', 'WITHDRAWN']]
    }
  },
  autoSave: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  autoSaveAmount: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  autoSaveFrequency: {
    type: DataTypes.ENUM('DAILY', 'WEEKLY', 'MONTHLY'),
    allowNull: true,
    validate: {
      isIn: [['DAILY', 'WEEKLY', 'MONTHLY']]
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  sequelize,
  tableName: 'savings_plans',
  timestamps: true,
  hooks: {
    beforeCreate: (savingsPlan: SavingsPlan) => {
      if (savingsPlan.type === 'SAFELOCK' && !savingsPlan.lockPeriod) {
        throw new Error('Lock period is required for Safelock savings');
      }
      if (savingsPlan.type === 'TARGET' && !savingsPlan.targetAmount) {
        throw new Error('Target amount is required for Target savings');
      }
      if (savingsPlan.autoSave && (!savingsPlan.autoSaveAmount || !savingsPlan.autoSaveFrequency)) {
        throw new Error('Auto save amount and frequency are required when auto save is enabled');
      }
    }
  }
});

// Relationships
User.hasMany(SavingsPlan);
SavingsPlan.belongsTo(User);

export default SavingsPlan; 