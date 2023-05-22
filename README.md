# Organization User Structure Management App

#### This Node.js server app implements a simple organization user structure management system.

### User roles
The app supports the following user roles:

***Admin:*** The top-most user with full access and permission.

***Boss:*** A boss can manage his subordinates and update their bossId.

***Regular:*** Regular users have limited access and can access to their own profile only.

## Stack
- Node.js
- Express.js
- TypeScript
- Sequelize (Postgres)
- JWT

## Getting started
### Install
```bash
npm install # install all dependencies
cp .env.example .env
ts-node /src/setup.ts
npm run dev
```

### Setup test data
```bash
ts-node /src/seed.ts # setup test users (admin)
```
## API Endpoints 

`POST /users`
- Description: Register a new user in the organization. Only the Admin can register new users.
- Required Fields:\
`email`: User's email address.\
`password`: User's password.\
`role`: User's role (admin, boss, or regular).\
`bossId`: ID of the user's boss (only applicable for non-admin users).

- Authorization: Bearer Token.


`POST /login`
- Description: Authenticates a user and returns an access token.
- Required fields:\
`email`: User's email address.\
`password`: User's password.

`GET /users`
- Description: Returns a list of users based on the user's role and access permissions.
- Authorization: Bearer Token
- Response:\
`For Admin`: Returns a list of all users in the organization.\
`For Bosses`: Returns the boss and all her subordinates (recursively).\
`For Regular Users`: Returns the user's own profile information.


`PATCH /users/:userId`
- Description: Allows a boss to change the boss of his subordinates.
- Authorization: Bearer Token
- Parameters:\
`userId`: ID of the user whose boss needs to be changed.
- Required Fields:\
`bossId`: ID of the new boss for the specified user.
