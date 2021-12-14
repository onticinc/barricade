const express = require('express');
const router = express.Router();
const { Game, HighScore } = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const game = require('../models/game');
/**
 * ============================
 * Game Controller
 * ============================
*/

// Game route
router.get('/', (req, res) => {
    // get all games
    Game.findAll()
        .then((gameList) => {
            //console.log('FOUND ALL GAMES', gameList);
            // res.json({ game: gameList });
            res.render('games/index', { game: gameList })
        })
        .catch((err) => {
            //console.log('ERROR', err);
            res.json({ message: 'Error occured, please try again....' });
        });
});

router.get('/new', (req, res) => {
    res.render('games/new');
});


// Get High Score
router.get('/high-score', (req, res) => {
    let gameHighScore = Number(req.params.highScore);
    Game.findAll({
        include: [HighScore]
    })
        .then((gameList) => {
            if (gameList) {
                gameList = gameList.map((game) => {
                    return game.toJSON();
                });
                console.log('.. this is the game list ...');
                console.log(gameList);
                // res.render('games/highscore', { gameList });
                res.json({ gameList });
            } else {
                //console.log('This game does not exist');
                // render a 404 page
                res.render('404', { message: 'Game does not exist' });
            }
        })
        .catch((error) => {
            console.log('ERROR', error);
        });
})

router.get('/high-score/new', isLoggedIn, function (req, res) {
    res.render('highScore/new');
});

// high score route
router.post('/high-score', isLoggedIn, function (req, res) {
    console.log('... this is the user submittitng for highscore ...');
    console.log(req.user); // user object for the logged in user.
    console.log(req.body); // object with submitted data
    console.log(req.body.game.toLowerCase());
    let gameName = req.body.game.toLowerCase();
    Game.findOne({ where: { name: gameName } })
        .then(function (game) {
            game.createHighScore({
                userId: req.user.id,
                initials: req.body.initials,
                highScore: req.body.highScore
            })
                .then(function (newHighScore) {
                    console.log('this is the high score', newHighScore.toJSON());
                    res.redirect(`/games/${newHighScore.gameId}`)
                })
                .catch(function (error) {
                    console.log("this is an error", error);
                    res.redirect('/games/high-score/new');
                })
        })
        .catch(function (error) {
            console.log("this is an error", error);
            res.redirect('/games/high-score/new');
        })
});

// GET to Edit page
router.get('/edit/:id', (req, res) => {
    let gameIndex = Number(req.params.id);
    Game.findByPk(gameIndex)
        .then((game) => {
            if (game) {
                game = game.toJSON();
                res.render('games/edit', { game });
            } else {
                //console.log('This game does not exist');
                // render a 404 page
                res.render('404', { message: 'Game does not exist' });
            }
        })
        .catch((error) => {
            console.log('ERROR', error);
        });

})

// Game Show Route
router.get('/:id', (req, res) => {
    console.log('PARAMS', req.params);
    let gameIndex = Number(req.params.id);
    console.log('IS THIS A NUMBER?', gameIndex);
    Game.findByPk(gameIndex)
        .then((game) => {
            if (game) {
                game = game.toJSON();
                //console.log('IS THIS A GAME?', game);
                res.render('games/show', { game });
            } else {
                console.log('This game does not exist');
                // render a 404 page
                res.render('404', { message: 'Game does not exist' });
            }
        })
        .catch((error) => {
            console.log('ERROR', error);
        });
});

/**
 * POST ROUTES
 * */

router.post('/', (req, res) => {
    console.log('SUBMITTED FORM', req.body);
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
            console.log('NEW GAME', newGame.toJSON());
            newGame = newGame.toJSON();
            res.redirect(`/games/${newGame.id}`);
        })
        .catch((error) => {
            console.log('ERROR', error);
            res.render('404', { message: 'Game was not added please try again...' });
        });
    // res.redirect()
});
/**
 * EDIT
 * */

router.put('/:id', (req, res) => {
    //console.log('EDIT FORM DATA THAT WAS SUBMITTED', req.body);
    //console.log('HERE IS THE ID', req.params.id);
    let gameIndex = Number(req.params.id);
    Game.update({
        name: req.body.name,
        model: req.body.model,
        manufacturer: req.body.manufacturer,
        serialNumber: req.body.serialNumber,
        notes: req.body.notes,
        picture: req.body.picture,
        highScore: Number(req.body.highScore),
        status: req.body.status,
    }, { where: { id: gameIndex } })
        .then((response) => {
            console.log('AFTER UPDATE', response);
            res.redirect(`/games/${gameIndex}`);
        })
        .catch((error) => {
            console.log('ERROR', error);
            res.render('404', { message: 'Update was not successful. Please try again.' })
        });
});
/**
 * DELETE
 * */
router.delete('/:id', (req, res) => {
    console.log('ID HERE', req.params.id);
    let gameIndex = Number(req.params.id);
    Game.destroy({ where: { id: gameIndex } })
        .then((response) => {
            console.log('GAME DELETED', response);
            res.redirect('/games');
        })
        .catch((error) => {
            console.log('ERROR', error);
            res.render('404', { message: 'Game was not deleted, please try again...' });
        })
});

module.exports = router;