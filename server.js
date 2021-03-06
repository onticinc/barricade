require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const methodOverride = require('method-override');

const SECRET_SESSION = process.env.SECRET_SESSION;
console.log(SECRET_SESSION);

app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));

// STATIC FILES
app.use(express.static(__dirname + '/public'));


// SET TEMPLATING ENGINE

app.use(layouts);
app.use(session({
  secret: SECRET_SESSION,    // What we actually will be giving the user on our site as a session cookie
  resave: false,             // Save the session even if it's modified, make this false
  saveUninitialized: true    // If we have a new session, we save it, therefore making that true
}));


// flash middleware
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

// Navigation 
app.get('/', (req, res) => {
  res.render('index');
})

// Add this above /auth controllers
app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get();
  res.render('profile', { id, name, email });
});

// controllers
app.use('/auth', require('./controllers/auth'));
app.use('/beers', require('./controllers/beer'));
app.use('/wines', require('./controllers/wine'));
app.use('/events', require('./controllers/event'));
app.use('/users', require('./controllers/users'));
app.use('/games', require('./controllers/game'));
app.use('/merch', require('./controllers/merch'));
app.use('/highscore', require('./controllers/highScore'));
app.use('/chuck', require('./controllers/chuckNorris'));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`???? You're listening to the smooth sounds of port ${PORT} ????`);
});

module.exports = server;
