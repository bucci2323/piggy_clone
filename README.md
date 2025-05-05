# Piggy - Savings and Investment Platform

A robust backend API for a savings and investment platform built with Node.js, Express, TypeScript, and MySQL.

## Features

- User authentication and authorization
- Wallet management
- Savings plans
- Investment options (stocks, bonds, mutual funds)
- Transaction history
- Admin dashboard

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MySQL
- Sequelize ORM
- JWT Authentication
- Express Validator
- Bcrypt
- Helmet
- Morgan
- CORS

## Prerequisites

- Node.js >= 18.0.0
- MySQL >= 8.0
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/piggy.git
cd piggy
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update the environment variables in `.env` with your configuration.

5. Create the database:
```sql
CREATE DATABASE piggy;
```

6. Run migrations:
```bash
npm run migrate
```

7. (Optional) Run seeders:
```bash
npm run seed
```

## Development

Start the development server:
```bash
npm run dev
```

## Production

Build and start the production server:
```bash
npm run build
npm start
```

## API Documentation

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/profile - Get user profile
- PUT /api/auth/profile - Update user profile
- PUT /api/auth/password - Change password

### Wallets
- POST /api/wallets - Create a wallet
- GET /api/wallets - Get all user wallets
- GET /api/wallets/:id - Get wallet by ID
- PUT /api/wallets/:id - Update wallet
- DELETE /api/wallets/:id - Delete wallet

### Savings Plans
- POST /api/savings-plans - Create a savings plan
- GET /api/savings-plans - Get all user savings plans
- GET /api/savings-plans/:id - Get savings plan by ID
- PUT /api/savings-plans/:id - Update savings plan
- DELETE /api/savings-plans/:id - Delete savings plan

### Investments
- POST /api/investments - Create an investment
- GET /api/investments - Get all user investments
- GET /api/investments/:id - Get investment by ID
- PUT /api/investments/:id - Update investment
- DELETE /api/investments/:id - Delete investment

### Transactions
- POST /api/transactions - Create a transaction
- GET /api/transactions - Get all user transactions
- GET /api/transactions/:id - Get transaction by ID
- GET /api/transactions/wallet/:walletId - Get transactions by wallet

### Users (Admin only)
- GET /api/users - Get all users
- GET /api/users/:id - Get user by ID
- PUT /api/users/:id - Update user
- DELETE /api/users/:id - Delete user

## Testing

Run tests:
```bash
npm test
```

## Linting and Formatting

Lint code:
```bash
npm run lint
```

Format code:
```bash
npm run format
```

## License

This project is licensed under the ISC License. 