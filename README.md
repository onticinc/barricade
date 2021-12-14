# Barricade App

Control Game information and customer high scores for Barricade in Pocatello Idaho.

Also manages Beer and Wine inventory and Upcoming Events.

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

### Game

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

| Column Name | Data Type | Notes                              |
| ----------- | --------- | ---------------------------------- |
| id          | Integer   | Serial Primary Key, Auto-generated |
| name        | String    | Must be provided                   |
| description | String    |                                    |
| link        | String    |                                    |
| cost        | String    |                                    |
| picture     | String    |                                    |
| date        | Date/Time |                                    |
| notes       | String    |                                    |
| createdAt   | Date      | Auto-generated                     |
| updatedAt   | Date      | Auto-generated                     |

### Wine Model

| Column Name    | Data Type | Notes                              |
| -------------- | --------- | ---------------------------------- |
| id             | Integer   | Serial Primary Key, Auto-generated |
| name           | String    | Must be provided                   |
| type           | String    |                                    |
| winery         | String    |                                    |
| pricePerGlass  | String    |                                    |
| pricePerBottle | String    |                                    |
| abv            | Date/Time |                                    |
| ava            | String    |                                    |
| notes          | String    |                                    |
| createdAt      | Date      | Auto-generated                     |
| updatedAt      | Date      | Auto-generated                     |

### Beer Model

| Column Name     | Data Type | Notes                              |
| --------------- | --------- | ---------------------------------- |
| id              | Integer   | Serial Primary Key, Auto-generated |
| name            | String    | Must be provided                   |
| type            | String    |                                    |
| brewery         | String    |                                    |
| pricePerGlass   | String    |                                    |
| pricePerGrowler | String    |                                    |
| abv             | Integer   |                                    |
| ibu             | Integer   |                                    |
| notes           | Text      |                                    |
| status          | Text      |                                    |
| createdAt       | Date      | Auto-generated                     |
| updatedAt       | Date      | Auto-generated                     |

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
│ └── ppConfig.json
├── controllers
│ └── auth.js
│ └── beer.js
│ └── chuckNorris.js
│ └── event.js
│ └── game.js
│ └── highScore.js
│ └── merch.js
│ └── users.js
│ └── wine.js
├── middleware
│ └── isLoggedIn.js
├── migrations
│ └── beer.js
│ └── merch.js
│ └── wine.js
│ └── user.js
│ └── game.js
│ └── event.js
│ └── high-score.js
├── models
│ └── beer.js
│ └── event.js
│ └── game.js
│ └── highscore.js
│ └── index.js
│ └── merch.js
│ └── user.js
│ └── wine.js
├── node_modules
│ └── ...
├── public
│ └── assets
│ └── css
│ └── style.css
| └── └── app.css
├── images
│ └── ...
├── test
│ └── auth.test.js
│ └── index.test.js
│ └── profile.test.js
│ └── user.test.js
├── views
│ └── auth
| └── └── login.ejs
| └── └── signup.ejs
│ └── beers
│ └── └── edit.ejs
│ └── └── index.ejs
│ └── └── new.ejs
│ └── └── show.ejs
│ └── events
│ └── └── edit.ejs
│ └── └── index.ejs
│ └── └── new.ejs
│ └── └── show.ejs
│ └── games
│ └── └── edit.ejs
│ └── └── index.ejs
│ └── └── new.ejs
│ └── └── show.ejs
│ └── highScore
│ └── └── highScore.ejs
│ └── └── new.ejs
│ └── partials
│ └── └── alerts.ejs
│ └── └── bootstrap.ejs
│ └── └── footer.ejs
│ └── └── toolbar.ejs
│ └── users
│ └── └── edit.ejs
│ └── └── index.ejs
│ └── └── new.ejs
│ └── └── show.ejs
│ └── wines
│ └── └── edit.ejs
│ └── └── index.ejs
│ └── └── new.ejs
│ └── └── show.ejs
├── .gitignore
├── database.js
├── package-lock.json
├── package.json
├── README.md
├── scratchpad.js
├── server.js

````

For general app setup:

- "dotenv": "^8.6.0"
- "ejs": "^3.1.6"
- "express": "^4.17.1"
- "express-ejs-layouts": "^2.5.0"
- "express-session": "^1.17.1"
- "method-override": "^3.0.0"


For login auth/encryption:

- "bcrypt": "^5.0.1"
- "connect-flash": "^0.1.1"
- "passport": "^0.4.1"
- "passport-local": "^1.0.0"

# External API

https://api.chucknorris.io/
Random Chuck Norris Jokes

# Resorces Used
https://www.npmjs.com/package/multer



# Code Snippets
## CRUD for Barricade

### Create / Post Route

```js
router.post("/", (req, res) => {
  console.log("SUBMITTED FORM", req.body);
  Game.create({
    name: req.body.name,
    model: req.body.model,
    manufacturer: req.body.manufacturer,
    serialNumber: req.body.serialNumber,
    notes: req.body.notes,
    picture: req.body.picture,
    status: req.body.status,
  })

    .then((newGame) => {
      console.log("NEW GAME", newGame.toJSON());
      newGame = newGame.toJSON();
      res.redirect(`/games/${newGame.id}`);
    })
    .catch((error) => {
      console.log("ERROR", error);
      res.render("404", { message: "Game was not added please try again..." });
    });
});
````

### Read

```js
// Game Show Route
router.get("/:id", (req, res) => {
  console.log("PARAMS", req.params);
  let gameIndex = Number(req.params.id);
  console.log("IS THIS A NUMBER?", gameIndex);
  Game.findByPk(gameIndex)
    .then((game) => {
      if (game) {
        game = game.toJSON();
        //console.log('IS THIS A GAME?', game);
        res.render("games/show", { game });
      } else {
        console.log("This game does not exist");
        // render a 404 page
        res.render("404", { message: "Game does not exist" });
      }
    })
    .catch((error) => {
      console.log("ERROR", error);
    });
});
```

### Update

```js
router.get("/edit/:id", (req, res) => {
  let gameIndex = Number(req.params.id);
  Game.findByPk(gameIndex)
    .then((game) => {
      if (game) {
        game = game.toJSON();
        res.render("games/edit", { game });
      } else {
        res.render("404", { message: "Game does not exist" });
      }
    })
    .catch((error) => {
      console.log("ERROR", error);
    });
});
```

### Delete

```js
router.delete("/:id", (req, res) => {
  console.log("ID HERE", req.params.id);
  let gameIndex = Number(req.params.id);
  Game.destroy({ where: { id: gameIndex } })
    .then((response) => {
      console.log("GAME DELETED", response);
      res.redirect("/games");
    })
    .catch((error) => {
      console.log("ERROR", error);
      res.render("404", {
        message: "Game was not deleted, please try again...",
      });
    });
});
```

### High Score Route

```js
// high score route
router.post("/high-score", isLoggedIn, function (req, res) {
  console.log("... this is the user submittitng for highscore ...");
  console.log(req.user); // user object for the logged in user.
  console.log(req.body); // object with submitted data
  console.log(req.body.game.toLowerCase());
  let gameName = req.body.game.toLowerCase();
  Game.findOne({ where: { name: gameName } })
    .then(function (game) {
      game
        .createHighScore({
          userId: req.user.id,
          initials: req.body.initials,
          highScore: req.body.highScore,
        })
        .then(function (newHighScore) {
          console.log("this is the high score", newHighScore.toJSON());
          res.redirect(`/games/${newHighScore.gameId}`);
        })
        .catch(function (error) {
          console.log("this is an error", error);
          res.redirect("/games/high-score/new");
        });
    })
    .catch(function (error) {
      console.log("this is an error", error);
      res.redirect("/games/high-score/new");
    });
});
```
