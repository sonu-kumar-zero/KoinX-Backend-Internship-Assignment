# KoinX Backend Internship Assignment

This repository contains the solution for the KoinX Backend Internship Assignment, featuring a backend built with TypeScript, Prisma ORM, and MongoDB Atlas.

## Features

- TypeScript for development
- Prisma ORM with MongoDB Atlas
- RESTful API endpoints

## Routes

### Available Coins

-Bitcoin
-Ethereum
-Matic Network

1. Stats of coin:

```
https://koinx-asssignment-sonu-kumar-zero.onrender.com/api/v1/coin/deviation?coin=Bitcoin
```

2. Deviation of coin:

```
https://koinx-asssignment-sonu-kumar-zero.onrender.com/api/v1/coin/stats?coin=Bitcoin
```

## Setup Instructions

### Prerequisites

- Node.js >= 14.x
- MongoDB Atlas account

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/sonu-kumar-zero/KoinX-Backend-Internship-Assignment.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd KoinX-Backend-Internship-Assignment
    ```

3.  Install dependencies:

    ```bash
    npm install
    ```

4.  Copy the .env.sample to .env:

    ```bash
    cp .env.sample .env

    ```

    Adjust the .env file to match your MongoDB Atlas connection details.

5.  Set up MongoDB Atlas (adjust .env for your connection string):

    ```bash
    npx prisma db push

    ```

6.  Start the Server:
    ```bash
    npm run dev
    ```

## License

This project is licensed under the MIT License.
