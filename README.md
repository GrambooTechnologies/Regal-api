# Node.js Express API with MSSQL

This is a simple REST API built using Node.js, Express, and MSSQL as the database. It provides basic functionality for interacting with a products database, including retrieving a list of products and fetching details for a specific product.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the API](#running-the-api)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have [Node.js](https://nodejs.org/) installed.
- You have [MSSQL](https://www.microsoft.com/en-us/sql-server) installed and running.
- You have a basic understanding of Node.js and SQL queries.

## Project Structure

```bash
├───config 
│   └───db.js               # Database connection configuration 
├───controllers 
│   └───product.controller.js # Product controller handling requests 
├───logs                    # This folder can store log files 
├───middlewares 
│   └───error.middleware.js  # Error handling middleware 
├───models 
│   └───product.model.js     # Handles SQL queries for products 
├───routes 
│   └───product.routes.js    # Routes for product API 
├───utils                   # Utility files (e.g., logging helpers) 
├───app.js                  # Main app file to set up Express and routes 
└───server.js               # Entry point for starting the server
