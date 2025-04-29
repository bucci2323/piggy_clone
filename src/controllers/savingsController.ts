
import { Request, Response } from 'express';
import { SavingsPlan, Wallet } from '../models';
import { logger } from '../utils/logger';

export const getSavingsPlans = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new Error('User not authenticated');
    }
    const userId = req.user.id;
    const savingsPlans = await SavingsPlan.findAll({ where: { userId } });
    res.status(200).json(savingsPlans);
  } catch (error) {
    logger.error('Error fetching savings plans:', error);
    res.status(500).json({ message: 'Error fetching savings plans' });
  }
};

export const createSavingsPlan = async (req: Request, res: Response) => {
  try {
    const { walletId, name, amount, frequency, nextDeduction } = req.body;
    const userId = req.user.id;

    const wallet = await Wallet.findOne({ where: { id: walletId, userId } });
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    const savingsPlan = await SavingsPlan.create({
      userId,
      walletId,
      name,
      amount,
      frequency,
      isActive: true,
      nextDeduction,
    });

    res.status(201).json(savingsPlan);
  } catch (error) {
    logger.error('Error creating savings plan:', error);
    res.status(500).json({ message: 'Error creating savings plan' });
  }
};

export const updateSavingsPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, amount, frequency, nextDeduction, isActive } = req.body;
    const userId = req.user.id;

    const savingsPlan = await SavingsPlan.findOne({ where: { id, userId } });
    if (!savingsPlan) {
      return res.status(404).json({ message: 'Savings plan not found' });
    }

    await savingsPlan.update({ name, amount, frequency, nextDeduction, isActive });
    res.status(200).json(savingsPlan);
  } catch (error) {
    logger.error('Error updating savings plan:', error);
    res.status(500).json({ message: 'Error updating savings plan' });
  }
};









// import { Request, Response, NextFunction } from 'express';
// import { SavingsPlan, Transaction, Wallet } from '../models';
// import { logger } from '../utils/logger';

// export class SavingsController {
//   public async createSavingsPlan(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { name, targetAmount, duration, frequency } = req.body;
//       if (!req.user) {
//         throw new Error('User not authenticated');
//       }
//       const userId = req.user.id;

//       const savingsPlan = await SavingsPlan.create({
//         userId,
//         name,
//         targetAmount,
//         duration,
//         frequency,
//         currentAmount: 0,
//         status: 'active',
//         startDate: new Date(),
//         endDate: new Date(Date.now() + duration * 24 * 60 * 60 * 1000)
//       });

//       res.status(201).json({
//         status: 'success',
//         data: { savingsPlan }
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   public async getSavingsPlans(req: Request, res: Response, next: NextFunction) {
//     try {
//       if (!req.user) {
//         throw new Error('User not authenticated');
//       }
//       const userId = req.user.id;
//       const savingsPlans = await SavingsPlan.findAll({ where: { userId } });

//       res.status(200).json({
//         status: 'success',
//         data: { savingsPlans }
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   public async getSavingsPlan(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { id } = req.params;
//       const userId = req.user.id;

//       const savingsPlan = await SavingsPlan.findOne({ where: { id, userId } });
//       if (!savingsPlan) {
//         throw new Error('Savings plan not found');
//       }

//       res.status(200).json({
//         status: 'success',
//         data: { savingsPlan }
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   public async depositToSavings(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { amount } = req.body;
//       const { id } = req.params;
//       const userId = req.user.id;

//       const savingsPlan = await SavingsPlan.findOne({ where: { id, userId } });
//       if (!savingsPlan) {
//         throw new Error('Savings plan not found');
//       }

//       const wallet = await Wallet.findOne({ where: { userId } });
//       if (!wallet || wallet.balance < amount) {
//         throw new Error('Insufficient wallet balance');
//       }

//       // Create transaction record
//       const transaction = await Transaction.create({
//         userId,
//         type: 'savings',
//         amount,
//         status: 'completed',
//         description: `Deposit to ${savingsPlan.name}`,
//         currency: wallet.currency
//       });

//       // Update savings plan amount
//       await savingsPlan.increment('currentAmount', { by: amount });
      
//       // Deduct from wallet
//       await wallet.decrement('balance', { by: amount });

//       res.status(200).json({
//         status: 'success',
//         data: { transaction, currentAmount: savingsPlan.currentAmount + amount }
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   public async withdrawFromSavings(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { amount } = req.body;
//       const { id } = req.params;
//       const userId = req.user.id;

//       const savingsPlan = await SavingsPlan.findOne({ where: { id, userId } });
//       if (!savingsPlan) {
//         throw new Error('Savings plan not found');
//       }

//       if (savingsPlan.currentAmount < amount) {
//         throw new Error('Insufficient savings balance');
//       }

//       const wallet = await Wallet.findOne({ where: { userId } });

//       // Create transaction record
//       const transaction = await Transaction.create({
//         userId,
//         type: 'savings',
//         amount: -amount,
//         status: 'completed',
//         description: `Withdrawal from ${savingsPlan.name}`,
//         currency: wallet.currency
//       });

//       // Update savings plan amount
//       await savingsPlan.decrement('currentAmount', { by: amount });
      
//       // Add to wallet
//       await wallet.increment('balance', { by: amount });

//       res.status(200).json({
//         status: 'success',
//         data: { transaction, currentAmount: savingsPlan.currentAmount - amount }
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   public async getSavingsTransactions(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { id } = req.params;
//       const userId = req.user.id;

//       const transactions = await Transaction.findAll({
//         where: {
//           userId,
//           type: 'savings',
//           description: { [Op.like]: `%${id}%` }
//         },
//         order: [['createdAt', 'DESC']]
//       });

//       res.status(200).json({
//         status: 'success',
//         data: { transactions }
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// }