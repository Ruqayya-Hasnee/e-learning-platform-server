 ## Overview

 This project is a RESTful API built with NestJS, PostgrSQL, and TypeORM.

## Features

Built with NestJS (Node.js framework)

Uses TypeORM for database management

PostgreSQL as the database

## Prerequisites

Before setting up the project, ensure you have the following installed:

Node.js (LTS version recommended)

Postgress

Git

NestJS CLI (Optional but recommended)

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation & Setup

1. Clone the Repository

$ git clone <repository-url>

$ cd <project-folder>

2. Install Dependencies

$ npm i

3. Setup Environment Variables

Create a .env file in the root directory and configure it:

PORT=your_port

# PostgreSQL Database Configuration

DB_HOST=your_db_host

DB_PORT=your_db_port

DB_USERNAME=your_db_username

DB_PASSWORD=your_db_password

DB_NAME=your_db_name

DB_SSL=your_db_ssl

JWT_SECRET=your_jwt_secret

JWT_EXPIRES_IN=jwt_exp_in

4. Configure PostgreSQL

Ensure PostgreSQL is running.

Create a database named your_database.

Use the credentials defined in the .env file.

5. Run Migrations

$ npm run migration:run

6. Start the Application

$ npm run start:dev
