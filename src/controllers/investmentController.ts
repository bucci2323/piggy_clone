import { Request, Response } from 'express';
// import Investment from '../models/investment';
// import User from '../models/user';
// import Wallet from '../models/wallet';
// import Transaction from '../models/transaction';
import {User, Wallet, Transaction , Investment} from '../models';

export const createInvestment = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { walletId, type, amount, duration, riskLevel } = req.body;

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if wallet exists and belongs to user
    const wallet = await Wallet.findOne({
      where: { id: walletId, userId },
    });
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    // Check if wallet has sufficient balance
    if (wallet.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Calculate expected returns based on type and duration
    let expectedReturns = 0;
    switch (type) {
      case 'stocks':
        expectedReturns = amount * 0.1 * (duration / 12); // 10% annual return
        break;
      case 'bonds':
        expectedReturns = amount * 0.05 * (duration / 12); // 5% annual return
        break;
      case 'mutual_funds':
        expectedReturns = amount * 0.08 * (duration / 12); // 8% annual return
        break;
    }

    // Create investment
    const investment = await Investment.create({
      userId,
      walletId,
      type,
      amount,
      duration,
      riskLevel,
      expectedReturns,
      status: 'active',
    });

    // Create transaction
    await Transaction.create({
      userId,
      walletId,
      type: 'investment',
      amount,
      currency: wallet.currency,
      status: 'completed',
      description: `Investment in ${type}`,
    });

    // Update wallet balance
    wallet.balance -= amount;
    await wallet.save();

    res.status(201).json({
      message: 'Investment created successfully',
      investment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating investment', error });
  }
};

export const getInvestments = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const investments = await Investment.findAll({
      where: { userId },
      include: [Wallet],
    });

    res.json(investments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching investments', error });
  }
};

export const getInvestmentById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params;

    const investment = await Investment.findOne({
      where: { id, userId },
      include: [Wallet],
    });

    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    res.json(investment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching investment', error });
  }
};

export const updateInvestment = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params;
    const { status } = req.body;

    const investment = await Investment.findOne({
      where: { id, userId },
    });

    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    investment.status = status;
    await investment.save();

    res.json({
      message: 'Investment updated successfully',
      investment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating investment', error });
  }
};

export const deleteInvestment = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params;

    const investment = await Investment.findOne({
      where: { id, userId },
    });

    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    await investment.destroy();

    res.json({ message: 'Investment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting investment', error });
  }
}; 