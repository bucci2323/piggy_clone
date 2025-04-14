import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './src/config/database';
import authRoutes from './src/routes/auth.routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true }).then(() => {
  console.log("Database connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

