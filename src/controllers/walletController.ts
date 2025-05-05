import { Request, Response } from 'express';
import Wallet from '../models/wallet';
import User from '../models/user';

export const createWallet = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { currency } = req.body;


    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    const existingWallet = await Wallet.findOne({
      where: { userId, currency },
    });
    if (existingWallet) {
      return res.status(400).json({ message: 'Wallet already exists for this currency' });
    }

    const wallet = await Wallet.create({
      userId,
      currency,
    });

    res.status(201).json({
      message: 'Wallet created successfully',
      wallet,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating wallet', error });
  }
};

export const getWallets = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const wallets = await Wallet.findAll({
      where: { userId },
    });

    res.json(wallets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wallets', error });
  }
};

export const getWalletById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params;

    const wallet = await Wallet.findOne({
      where: { id, userId },
    });

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    res.json(wallet);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wallet', error });
  }
}; 