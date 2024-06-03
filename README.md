# E-COMMERCE Backend Project

This project is a Node.js-based backend for an e-commerce application. It provides APIs for user authentication, cart management, and order processing using Express.js and MongoDB.

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Usage](#usage)
7. [API Endpoints](#api-endpoints)

## Introduction
The E-Commerce Backend Project is a RESTful API designed to support the operations of an e-commerce platform. It handles user authentication, product management, order processing, and other essential e-commerce functionalities. This project is built using modern technologies to ensure scalability, maintainability, and performance.

## Features
- User management
- User authentication and authorization
- Product management
- Order management
- Cart management
- User profile management
- Secure API endpoints

## Technologies
- **Backend Framework**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- Others: Mongoose, bcrypt, dotenv

## Installation
To get started with the project, follow these steps:

Clone the repository:

```sh
git clone https://github.com/yourusername/e-commerce-backend.git
```

Navigate to the project directory:

```sh
cd E-Commerce_Backend
```

Install dependencies:

```sh
npm install
```

# Configuration
Create a .env file in the root directory and add the following environment variables:

```
PORT=4000
DB_HOST=localhost
DB_PORT=27017
DB_DATABASE=ecommerce_DB
MONGO_URI="mongodb://localhost:27017/User"
JWT_SECRET='h123'
ADMIN_SECRET_KEY='0000'
```

# Usage
To start the server, run the following command:

```sh
npm start
```

The server will start on the port specified in your .env file (default is 4000).

# API Endpoints
For detailed information on all available API endpoints, please refer to the Swagger documentation:

[Swagger API Documentation](https://app.swaggerhub.com/apis/ESLAMELBHNASWEE110/E-CommerceBackend/1.0.0)
