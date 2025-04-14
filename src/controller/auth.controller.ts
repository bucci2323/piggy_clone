import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Wallet } from '../models/wallet';
import { sequelize } from '../config/database';

export const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { firstName, lastName, email, password } = req.body;
  
    // Start a transaction
    const t = await sequelize.transaction();
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create user within the transaction
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
      }, { transaction: t });

      // Create wallet for the user within the same transaction
      const wallet = await Wallet.create({
        userId: newUser.getDataValue('id'),
        balance: 0.0
      }, { transaction: t });

      // Commit the transaction
      await t.commit();

      res.status(201).json({
        user: {
          id: newUser.getDataValue('id'),
          firstName: newUser.getDataValue('firstName'),
          lastName: newUser.getDataValue('lastName'),
          email: newUser.getDataValue('email')
        },
        wallet: {
          id: wallet.getDataValue('id'),
          balance: wallet.getDataValue('balance')
        }
      });
    } catch (error) {
      // Rollback the transaction in case of error
      await t.rollback();
      next(error);
    }
  };

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.getDataValue("password"));
    if (!isMatch)  res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.getDataValue("id") }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    next(error);  
  }
};


  


// export const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const { firstName, lastName, email, password } = req.body;  // Extract from the request body
  
//     // Start a transaction to ensure both user and wallet are created together
//     const t = await sequelize.transaction();
  
//     try {
//       // Step 1: Create the user
//       const user = await User.create(
//         { firstName, lastName, email, password },
//         { transaction: t }
//       );
  
//       // Step 2: Create the wallet for the user
//       const wallet = await Wallet.create(
//         { userId: user.id, balance: 0.0 },  // Start with a balance of 0
//         { transaction: t }
//       );
  
//       // Commit the transaction after both entities are created successfully
//        res.status(201).json({
//         user: {
//           id: user.id,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           email: user.email,
//         },
//         wallet: {
//           id: wallet.id,  // Wallet ID
//           balance: wallet.balance,  // Wallet balance
//         },
//       });
//     } catch (error) {
//       // Rollback transaction in case of error
//       await t.rollback();
//       console.error(error);
//       return res.status(500).json({
//         message: "Error creating user and wallet",
//         error: error.message,
//       });
//     }
//   };