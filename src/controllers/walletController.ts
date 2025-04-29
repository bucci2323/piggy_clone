import { Request, Response } from 'express';
import { Wallet, Transaction } from '../models';
import { logger } from '../utils/logger';

export const createWallet = async (req: Request, res: Response) => {
  try {
    const { currency } = req.body;
    const userId = req.user.id; // Will be set by auth middleware

    const wallet = await Wallet.create({
      userId,
      currency,
      balance: 0,
    });

    res.status(201).json({
      status: 'success',
      data: { wallet },
    });
  } catch (error) {
    logger.error('Error creating wallet:', error);
    res.status(500).json({ message: 'Error creating wallet' });
  }
};

export const deposit = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const { id } = req.params;
    const userId = req.user.id;

    const wallet = await Wallet.findOne({ where: { id, userId } });
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    // Create transaction record
    const transaction = await Transaction.create({
      userId,
      walletId: id,
      type: 'deposit',
      amount,
      currency: wallet.currency,
      status: 'completed',
      description: 'Wallet deposit',
    });

    // Update wallet balance
    await wallet.increment('balance', { by: amount });

    res.status(200).json({
      status: 'success',
      data: { transaction },
    });
  } catch (error) {
    logger.error('Error processing deposit:', error);
    res.status(500).json({ message: 'Error processing deposit' });
  }
};