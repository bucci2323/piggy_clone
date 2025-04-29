import { Request, Response } from 'express';
import { Investment, Wallet } from '../models';
import { logger } from '../utils/logger';

export const getInvestments = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const investments = await Investment.findAll({ where: { userId } });
    res.status(200).json(investments);
  } catch (error) {
    logger.error('Error fetching investments:', error);
    res.status(500).json({ message: 'Error fetching investments' });
  }
};

export const createInvestment = async (req: Request, res: Response) => {
  try {
    const { walletId, planName, amount, expectedReturn, startDate, endDate } = req.body;
    const userId = req.user.id;

    const wallet = await Wallet.findOne({ where: { id: walletId, userId } });
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    const investment = await Investment.create({
      userId,
      walletId,
      planName,
      amount,
      expectedReturn,
      startDate,
      endDate,
      status: 'active',
    });

    res.status(201).json(investment);
  } catch (error) {
    logger.error('Error creating investment:', error);
    res.status(500).json({ message: 'Error creating investment' });
  }
};

export const updateInvestment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { planName, amount, expectedReturn, startDate, endDate, status } = req.body;
    const userId = req.user.id;

    const investment = await Investment.findOne({ where: { id, userId } });
    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    await investment.update({ planName, amount, expectedReturn, startDate, endDate, status });
    res.status(200).json(investment);
  } catch (error) {
    logger.error('Error updating investment:', error);
    res.status(500).json({ message: 'Error updating investment' });
  }
};



// import { Request, Response, NextFunction } from 'express';
// import { Investment, Wallet, Transaction } from '../models';
// import { logger } from '../utils/logger';

// export class InvestmentController {
//   public async createInvestment(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { amount, duration, planId } = req.body;
//       if (!req.user?.id) {
//         return res.status(401).json({
//           status: 'error',
//           message: 'Unauthorized'
//         });
//       }
//       const userId = req.user.id;

//       const investment = await Investment.create({
//         userId,
//         amount,
//         duration,
//         planId,
//         status: 'active',
//         startDate: new Date(),
//         endDate: new Date(Date.now() + duration * 24 * 60 * 60 * 1000)
//       });

//       res.status(201).json({
//         status: 'success',
//         data: { investment }
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   public async getInvestments(req: Request, res: Response, next: NextFunction) {
//     try {
//       if (!req.user?.id) {
//         return res.status(401).json({
//           status: 'error',
//           message: 'Unauthorized'
//         });
//       }
//       const userId = req.user.id;
//       const investments = await Investment.findAll({ where: { userId } });

//       res.status(200).json({
//         status: 'success',
//         data: { investments }
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   public async getInvestment(req: Request, res: Response, next: NextFunction) {
//     try {
//       if (!req.user?.id) {
//         return res.status(401).json({
//           status: 'error',
//           message: 'Unauthorized'
//         });
//       }
//       const userId = req.user.id;
//       const { id } = req.params;

//       const investment = await Investment.findOne({ where: { id, userId } });
//       if (!investment) {
//         throw new Error('Investment not found');
//       }

//       res.status(200).json({
//         status: 'success',
//         data: { investment }
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   public async liquidateInvestment(req: Request, res: Response, next: NextFunction) {
//     try {
//       if (!req.user?.id) {
//         return res.status(401).json({
//           status: 'error',
//           message: 'Unauthorized'
//         });
//       }
//       const userId = req.user.id;
//       const { id } = req.params;

//       const investment = await Investment.findOne({ where: { id, userId } });
//       if (!investment) {
//         throw new Error('Investment not found');
//       }


//       investment.status = 'active';
//       await investment.save();

//       res.status(200).json({
//         status: 'success',
//         data: { investment }
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   public async getInvestmentPlans(req: Request, res: Response, next: NextFunction) {
//     try {
//       // Add investment plans logic here
//       const plans = [
//         { id: 1, name: 'Basic Plan', minAmount: 1000, interestRate: 10 },
//         { id: 2, name: 'Premium Plan', minAmount: 5000, interestRate: 15 },
//         { id: 3, name: 'Elite Plan', minAmount: 10000, interestRate: 20 }
//       ];

//       res.status(200).json({
//         status: 'success',
//         data: { plans }
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// }