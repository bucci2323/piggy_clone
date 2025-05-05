import { Request, Response } from 'express';
import { User, Wallet, Transaction, SavingsPlan } from '../models';

export const createPlan = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { walletId, name, amount, frequency } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    const wallet = await Wallet.findOne({
      where: { id: walletId, userId },
    });
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }


    if (wallet.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }


    const nextDeduction = new Date();
    switch (frequency) {
      case 'daily':
        nextDeduction.setDate(nextDeduction.getDate() + 1);
        break;
      case 'weekly':
        nextDeduction.setDate(nextDeduction.getDate() + 7);
        break;
      case 'monthly':
        nextDeduction.setMonth(nextDeduction.getMonth() + 1);
        break;
    }


    const plan = await SavingsPlan.create({
      userId,
      walletId,
      name,
      amount,
      frequency,
      nextDeduction,
    });


    await Transaction.create({
      userId,
      walletId,
      type: 'savings',
      amount,
      currency: wallet.currency,
      status: 'completed',
      description: `Initial deposit for savings plan: ${name}`,
    });

    // Update wallet balance
    wallet.balance -= amount;
    await wallet.save();

    res.status(201).json({
      message: 'Savings plan created successfully',
      plan,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating savings plan', error });
  }
};

export const getPlans = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const plans = await SavingsPlan.findAll({
      where: { userId },
      include: [Wallet],
    });

    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching savings plans', error });
  }
};

export const getPlanById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params;

    const plan = await SavingsPlan.findOne({
      where: { id, userId },
      include: [Wallet],
    });

    if (!plan) {
      return res.status(404).json({ message: 'Savings plan not found' });
    }

    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching savings plan', error });
  }
};

export const updatePlan = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params;
    const { isActive } = req.body;

    const plan = await SavingsPlan.findOne({
      where: { id, userId },
    });

    if (!plan) {
      return res.status(404).json({ message: 'Savings plan not found' });
    }

    plan.isActive = isActive;
    await plan.save();

    res.json({
      message: 'Savings plan updated successfully',
      plan,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating savings plan', error });
  }
};

export const deletePlan = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params;

    const plan = await SavingsPlan.findOne({
      where: { id, userId },
    });

    if (!plan) {
      return res.status(404).json({ message: 'Savings plan not found' });
    }

    await plan.destroy();

    res.json({ message: 'Savings plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting savings plan', error });
  }
}; 