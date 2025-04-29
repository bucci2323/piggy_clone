import { Request, Response } from 'express';
import { Transaction, Wallet } from '../models';
import { logger } from '../utils/logger';

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const transactions = await Transaction.findAll({ where: { userId } });
    res.status(200).json(transactions);
  } catch (error) {
    logger.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Error fetching transactions' });
  }
};

export const getTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const transaction = await Transaction.findOne({ where: { id, userId } });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    logger.error('Error fetching transaction:', error);
    res.status(500).json({ message: 'Error fetching transaction' });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { walletId, type, amount, currency, description } = req.body;
    const userId = req.user.id;

    const wallet = await Wallet.findOne({ where: { id: walletId, userId } });
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    const transaction = await Transaction.create({
      userId,
      walletId,
      type,
      amount,
      currency,
      status: 'pending',
      description,
    });

    res.status(201).json(transaction);
  } catch (error) {
    logger.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Error creating transaction' });
  }
};