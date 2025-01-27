# Book Store (Backend)

## A project about book store using for applying in role Fullstack Developer

This project is a backend API built using **NestJS** with **TypeScript**. It utilizes **Prisma** as the ORM for database management and **PostgreSQL** as the database engine. The application also includes **Swagger** for API documentation, and is containerized with **Docker Compose** to handle database initialization.

## Tech Stack

- **NestJS** - Framework for building efficient and scalable Node.js applications.
- **TypeScript** - A statically typed superset of JavaScript.
- **Prisma** - ORM for database management.
- **PostgreSQL** - Relational database management system.
- **Passport** - Middleware for handling authentication.
- **Swagger** - API documentation tool.
- **Docker Compose** - Tool for defining and running multi-container Docker applications (for database).

## Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js (v22)** (or a stable LTS version, e.g., 16 or 18)
- **Docker** - To run the database container
- **Docker Compose** - To manage multi-container environments
- **PostgreSQL** - Database engine (handled via Docker Compose in this setup)

You can check your Node.js version using:

```bash
node -v
```

Recommended stable Node.js versions are 16.x or 18.x, but the project currently runs on v22.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/lethal1147/test-softnova-be.git
cd test-softnova-be
```

2. Install dependencies:

```bash
npm install
```

3. Set up the environment variables:
   Create a .env file at the root of the project and add the following environment variables:

```env
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<dbname>?schema=public"

POSTGRES_USER=<your_postgres_user>
POSTGRES_PASSWORD=<your_postgres_password>
POSTGRES_DB=<dbname>

HASH_SALT=<random_hast_salt>

JWT_SECRET=<random_secret_key>
```

Ensure that the <username>, <password>, and <dbname> are replaced with your actual database credentials.

4. Initialize the database:
   Run the Docker Compose command to start the PostgreSQL container:

```bash
docker-compose up -d
```

This will initialize the PostgreSQL database.

5. Run the seed script:
   Once the database is running, you can seed the database by running the seed script. This will create an admin user with a default email (test@gmail.com) and password (123456aA\*).

```bash
npm run seed
```

This script will insert default data into the database and create an admin user for initial access.

## Usage

1. Start the application:
   After setting up the database, you can start the NestJS server

```bash
npm run start:dev
```

The application will be available at http://localhost:3000/api

2. Swagger API Documentation:
   Once the application is running, you can access the Swagger API documentation at:
   http://localhost:3000/api-docs
   This will provide an interactive UI for testing API endpoints.
