# Barricade App

# External API

https://api.chucknorris.io/

## Express authentication template using Passport + Flash messages + custom middleware

- Sequelize user model / migration
- Settings for PostgreSQL
- Passport and passport-local for authentication
- Sessions to keep user logged in between pages
- Flash messages for errors and successes
- Passwords that are hashed with BCrypt
- EJS Templating and EJS Layouts

### User Model

| Column Name | Data Type Notes |
| ----------- | --------------- | ---------------------------------- |
| id          | Integer         | Serial Primary Key, Auto-generated |
| firstName   | String          | Must be provided                   |
| lastName    | String          | Must be Provided                   |
| initials    | String          | Must be Provided / used for score  |
| phoneNumber | String          |                                    |
| userLevel   | Integer         | Set by Admin / Owner               |
| email       | String          | Must be unique / used for login    |
| password    | String          | Stored as a hash                   |
| createdAt   | Date            | Auto-generated                     |
| updatedAt   | Date            | Auto-generated                     |

### Game Model

| Column Name  | Data Type | Notes                              |
| ------------ | --------- | ---------------------------------- |
| id           | Integer   | Serial Primary Key, Auto-generated |
| name         | String    | Must be provided                   |
| model        | String    |                                    |
| manufacturer | String    |                                    |
| serialNumber | String    |                                    |
| notes        | String    |                                    |
| picture      | String    |                                    |
| highScore    | String    |                                    |
| createdAt    | Date      | Auto-generated                     |
| updatedAt    | Date      | Auto-generated                     |

### Event Model

| Column Name  | Data Type | Notes                              |
| ------------ | --------- | ---------------------------------- |
| id           | Integer   | Serial Primary Key, Auto-generated |
| name         | String    | Must be provided                   |
| model        | String    |                                    |
| manufacturer | String    |                                    |
| serialNumber | String    |                                    |
| notes        | String    |                                    |
| picture      | String    |                                    |
| highScore    | String    |                                    |
| createdAt    | Date      | Auto-generated                     |
| updatedAt    | Date      | Auto-generated                     |

### Default Routes

| Method | Path         | Location  | Purpose              |
| ------ | ------------ | --------- | -------------------- |
| GET    | /            | server.js | Home page            |
| GET    | /auth/login  | auth.js   | Login form           |
| GET    | /auth/signup | auth.js   | Signup form          |
| POST   | /auth/login  | auth.js   | Login user           |
| POST   | /auth/signup | auth.js   | Creates User         |
| GET    | /auth/logout | auth.js   | Removes session info |
| GET    | /profile     | server.js | Regular User Profile |

File Structure

├── config
│ └── config.json
├── controllers
│ └── auth.js
├── models
│ └── index.js
├── node_modules
│ └── ...
├── public
│ └── assets
│ └── css
│ └── style.css
├── test
│ └── auth.test.js
│ └── index.test.js
│ └── profile.test.js
│ └── user.test.js
├── views
│ └── auth
│ └── login.ejs
│ └── signup.ejs
│ └── index.ejs
│ └── layout.ejs
│ └── profile.ejs
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
├── server.js

```

```
