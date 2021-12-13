const express = require('express');
const router = express.Router();
const { HighScore } = require('../models/highscore');

/**
 * ============================
 * High Score Controller
 * ============================
*/

// High Score route
router.get('/', (req, res) => {

    // get all users, events, 
    User.findAll()
        .then((userList) => {
            //console.log('FOUND ALL GAMES', gameList);
            // res.json({ game: gameList });
            res.render('game/index', { games: gameList })
        })
        .catch((err) => {
            //console.log('ERROR', err);
            res.json({ message: 'Error occured, please try again....' });
        });

});


module.exports = router;