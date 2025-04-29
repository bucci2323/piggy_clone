# PiggyVest-Like Backend

A TypeScript-based backend for a savings and investment web application similar to PiggyVest. This application provides features for automated savings, flexible wallets, and investment options.

## Features

- User Management (Registration, Authentication, Profile)
- Flexible Wallets (NGN and USD)
- Automated Savings Plans
- Investment Options
- Transaction Management
- Email/SMS Notifications

## Technology Stack

- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: Sequelize
- **Framework**: Node.js with Express.js
- **Authentication**: JWT
- **Validation**: Joi
- **Logging**: Winston
- **Testing**: Jest

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd piggyvest-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=piggyvest
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=24h
   EXCHANGE_RATE_API_KEY=your_api_key
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_USER=your_smtp_user
   SMTP_PASS=your_smtp_password
   EMAIL_FROM=noreply@piggyvest.com
   ```

4. Create the MySQL database:
   ```sql
   CREATE DATABASE piggyvest;
   ```

## Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Run tests:
   ```bash
   npm test
   ```

3. Lint code:
   ```bash
   npm run lint
   ```

## API Documentation

The API documentation is available at `/api-docs` when running the server in development mode.

### Authentication Endpoints

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login and get JWT
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password

### Wallet Endpoints

- `GET /api/v1/wallets` - List user wallets
- `POST /api/v1/wallets` - Create a new wallet
- `POST /api/v1/wallets/:id/deposit` - Deposit funds
- `POST /api/v1/wallets/:id/withdraw` - Withdraw funds

### Savings Plan Endpoints

- `GET /api/v1/savings-plans` - List savings plans
- `POST /api/v1/savings-plans` - Create a new savings plan
- `PUT /api/v1/savings-plans/:id` - Update savings plan
- `DELETE /api/v1/savings-plans/:id` - Delete savings plan

### Investment Endpoints

- `GET /api/v1/investments` - List investments
- `POST /api/v1/investments` - Create a new investment
- `GET /api/v1/investments/:id` - Get investment details
- `POST /api/v1/investments/:id/withdraw` - Withdraw investment returns

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── models/         # Database models
├── services/       # Business logic
├── middleware/     # Custom middleware
├── routes/         # API routes
├── jobs/          # Background jobs
├── utils/         # Utility functions
└── tests/         # Test files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 