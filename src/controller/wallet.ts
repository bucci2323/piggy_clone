// import { User } from '../models/User
// import { Wallet } from '../models/wallet';

// export const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   const { fullName, email, password } = req.body;

//   try {
//     // Hash the password and create the user
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({ fullName, email, password: hashedPassword });

//     // Create a wallet for the new user
//     await Wallet.create({
//       userId: newUser.id,
//       balance: 0.0,  // Initial balance
//     });

//     // Respond with a success message
//     res.status(201).json({ message: "User and wallet created" });
//   } catch (error) {
//     next(error); // Handle errors (e.g., validation, duplicate email)
//   }
// };
