# Storefront Backend Project

## Installation

1. Install dependencies
`npm install`

2. Run migration
`db-migrate up`

3. Start the server
`npm start`

## Setup Database

- connect to database `psql -U postgres`
- create user `CREATE USER udacity WITH PASSOWORD '1234';`
- create database
    - `CREATE DATABASE project2;`
    - `CREATE DATABASE project2_test;`
- grant privileges
    - `GRANT ALL PRIVILEGES ON DATABASE project2 TO udacity;`
    - `GRANT ALL PRIVILEGES ON DATABASE project2_test TO udacity;`

## Environment variables

POSTGRES_HOST=127.0.0.1

POSTGRES_DB=project2

POSTGRES_TEST_DB=project2_test

POSTGRES_USER=udacity

POSTGRES_PASSWORD=1234

ENV=dev

BCRYPT_PASSWORD=password1234!@#$

SALT_ROUNDS=10

TOKEN_SECRET=secretjwt1234
