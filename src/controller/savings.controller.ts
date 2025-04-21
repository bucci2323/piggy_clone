import { Request, Response, NextFunction } from 'express';
import { SavingsPlan } from '../models/savingsPlan';
import { Wallet } from '../models/wallet';
import { Transaction } from '../models/transaction';
import { sequelize } from '../config/database';

// Create a new savings plan
export const createSavingsPlan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, type, targetAmount, lockPeriod, autoSave, autoSaveAmount, autoSaveFrequency } = req.body;
  const userId = req.user?.id; // Assuming you have user authentication middleware

  const t = await sequelize.transaction();

  try {
    // Create the savings plan
    const savingsPlan = await SavingsPlan.create({
      name,
      type,
      targetAmount,
      lockPeriod,
      autoSave,
      autoSaveAmount,
      autoSaveFrequency,
      userId,
      interestRate: calculateInterestRate(type), // You'll need to implement this
    }, { transaction: t });

    // If initial deposit is provided, process it
    if (req.body.initialDeposit) {
      const wallet = await Wallet.findOne({ where: { userId } });
      if (!wallet) {
        throw new Error('Wallet not found');
      }

      if (wallet.getDataValue('balance') < req.body.initialDeposit) {
        throw new Error('Insufficient funds');
      }

      // Update wallet balance
      await wallet.update({
        balance: wallet.getDataValue('balance') - req.body.initialDeposit
      }, { transaction: t });

      // Update savings plan
      await savingsPlan.update({
        currentAmount: req.body.initialDeposit
      }, { transaction: t });

      // Create transaction record
      await Transaction.create({
        userId,
        type: 'SAVINGS_DEPOSIT',
        amount: req.body.initialDeposit,
        status: 'completed',
        description: `Initial deposit for ${name} savings plan`
      }, { transaction: t });
    }

    await t.commit();
    res.status(201).json(savingsPlan);
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

// Add money to savings plan
export const addToSavings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { amount, savingsPlanId } = req.body;
  const userId = req.user?.id;

  const t = await sequelize.transaction();

  try {
    const savingsPlan = await SavingsPlan.findOne({ where: { id: savingsPlanId, userId } });
    if (!savingsPlan) {
      throw new Error('Savings plan not found');
    }

    const wallet = await Wallet.findOne({ where: { userId } });
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    if (wallet.getDataValue('balance') < amount) {
      throw new Error('Insufficient funds');
    }

    // Update wallet balance
    await wallet.update({
      balance: wallet.getDataValue('balance') - amount
    }, { transaction: t });

    // Update savings plan
    await savingsPlan.update({
      currentAmount: savingsPlan.getDataValue('currentAmount') + amount
    }, { transaction: t });

    // Create transaction record
    await Transaction.create({
      userId,
      type: 'SAVINGS_DEPOSIT',
      amount,
      status: 'completed',
      description: `Deposit to ${savingsPlan.getDataValue('name')} savings plan`
    }, { transaction: t });

    await t.commit();
    res.json({ message: 'Deposit successful', savingsPlan });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

// Withdraw from savings plan
export const withdrawFromSavings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { amount, savingsPlanId } = req.body;
  const userId = req.user?.id;

  const t = await sequelize.transaction();

  try {
    const savingsPlan = await SavingsPlan.findOne({ where: { id: savingsPlanId, userId } });
    if (!savingsPlan) {
      throw new Error('Savings plan not found');
    }

    // Check if savings plan is locked
    if (savingsPlan.getDataValue('type') === 'SAFELOCK') {
      const lockEndDate = new Date(savingsPlan.getDataValue('startDate'));
      lockEndDate.setDate(lockEndDate.getDate() + savingsPlan.getDataValue('lockPeriod'));
      
      if (new Date() < lockEndDate) {
        throw new Error('Cannot withdraw from Safelock before lock period ends');
      }
    }

    if (savingsPlan.getDataValue('currentAmount') < amount) {
      throw new Error('Insufficient funds in savings plan');
    }

    const wallet = await Wallet.findOne({ where: { userId } });
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    // Update wallet balance
    await wallet.update({
      balance: wallet.getDataValue('balance') + amount
    }, { transaction: t });

    // Update savings plan
    await savingsPlan.update({
      currentAmount: savingsPlan.getDataValue('currentAmount') - amount
    }, { transaction: t });

    // Create transaction record
    await Transaction.create({
      userId,
      type: 'SAVINGS_WITHDRAWAL',
      amount,
      status: 'completed',
      description: `Withdrawal from ${savingsPlan.getDataValue('name')} savings plan`
    }, { transaction: t });

    await t.commit();
    res.json({ message: 'Withdrawal successful', savingsPlan });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

// Helper function to calculate interest rate based on plan type
const calculateInterestRate = (type: string): number => {
  switch (type) {
    case 'PIGGYBANK':
      return 0.1; // 10% per annum
    case 'SAFELOCK':
      return 0.13; // 13% per annum
    case 'TARGET':
      return 0.09; // 9% per annum
    default:
      return 0.0;
  }
}; 