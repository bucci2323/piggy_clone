import { Request, Response } from 'express';
import { User, Wallet, Transaction } from '../models';
import { Op } from 'sequelize';

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { walletId, type, amount, description } = req.body;

    // Check if user exists
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


    if (type === 'withdrawal' && wallet.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }


    const transaction = await Transaction.create({
      userId,
      walletId,
      type,
      amount,
      currency: wallet.currency,
      status: 'completed',
      description,
    });

    // Update wallet balance
    if (type === 'deposit') {
      wallet.balance += amount;
    } else if (type === 'withdrawal') {
      wallet.balance -= amount;
    }
    await wallet.save();

    res.status(201).json({
      message: 'Transaction created successfully',
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating transaction', error });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { type, status, startDate, endDate } = req.query;

    const where: any = { userId };
    if (type) where.type = type;
    if (status) where.status = status;
    if (startDate && endDate) {
      where.createdAt = {
        [Op.between]: [new Date(startDate as string), new Date(endDate as string)],
      };
    }

    const transactions = await Transaction.findAll({
      where,
      include: [Wallet],
      order: [['createdAt', 'DESC']],
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
};

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params;

    const transaction = await Transaction.findOne({
      where: { id, userId },
      include: [Wallet],
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transaction', error });
  }
};

export const getTransactionsByWallet = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { walletId } = req.params;

// check if the wallet belings to the user
    const wallet = await Wallet.findOne({
      where: { id: walletId, userId },
    });
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    const transactions = await Transaction.findAll({
      where: { userId, walletId },
      order: [['createdAt', 'DESC']],
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
}; 