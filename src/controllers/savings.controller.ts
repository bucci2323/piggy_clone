import { Request, Response } from 'express';
import { SavingsPlan } from '../models/savingsPlan';
import { Transaction } from '../models/transaction';
import { User } from '../models/User';

export const createSavingsPlan = async (req: Request, res: Response) => {
  try {
    const { name, type, targetAmount, lockPeriod, autoSave, autoSaveAmount, autoSaveFrequency } = req.body;
    const userId = req.user?.id;

    const savingsPlan = await SavingsPlan.create({
      name,
      type,
      targetAmount,
      lockPeriod,
      autoSave,
      autoSaveAmount,
      autoSaveFrequency,
      userId
    });

    res.status(201).json(savingsPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating savings plan', error });
  }
};

export const addToSavings = async (req: Request, res: Response) => {
  try {
    const { amount, savingsPlanId } = req.body;
    const userId = req.user?.id;

    const savingsPlan = await SavingsPlan.findOne({ where: { id: savingsPlanId, userId } });
    if (!savingsPlan) {
      return res.status(404).json({ message: 'Savings plan not found' });
    }

    const transaction = await Transaction.create({
      amount,
      type: 'DEPOSIT',
      savingsPlanId,
      userId
    });

    await savingsPlan.increment('currentAmount', { by: amount });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to savings', error });
  }
};

export const withdrawFromSavings = async (req: Request, res: Response) => {
  try {
    const { amount, savingsPlanId } = req.body;
    const userId = req.user?.id;

    const savingsPlan = await SavingsPlan.findOne({ where: { id: savingsPlanId, userId } });
    if (!savingsPlan) {
      return res.status(404).json({ message: 'Savings plan not found' });
    }

    if (savingsPlan.currentAmount < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    const transaction = await Transaction.create({
      amount,
      type: 'WITHDRAWAL',
      savingsPlanId,
      userId
    });

    await savingsPlan.decrement('currentAmount', { by: amount });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error withdrawing from savings', error });
  }
}; 