import { sequelize } from '../config/database';
import { User } from './user';
import { Wallet } from './wallet';
import { Transaction } from './transaction';
import { SavingsPlan } from './savingsPlan';
import { Investment } from './investment';

User.initialize(sequelize);
Wallet.initialize(sequelize);
Transaction.initialize(sequelize);
SavingsPlan.initialize(sequelize);
Investment.initialize(sequelize);


const models = {
  User,
  Wallet,
  Transaction,
  SavingsPlan,
  Investment,
};


Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize, User, Wallet, Transaction, SavingsPlan, Investment };