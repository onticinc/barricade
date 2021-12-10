const express = require('express');
const router = express.Router();
const { User } = require('../models');

/**
 * ============================
 * USERS Controller
 * ============================
*/

// User route
router.get('/', (req, res) => {
    // get all user
    User.findAll()
        .then((userList) => {
            //console.log('FOUND ALL USERS', userList);
            // res.json({ user: userList });
            res.render('users/index', { user: userList })
        })
        .catch((err) => {
            console.log('ERROR', err);
            res.json({ message: 'Error occured, please try again....' });
        });
});

router.get('/new', (req, res) => {
    res.render('users/new');
});

// GET to Edit page
router.get('/edit/:id', (req, res) => {
    let userIndex = Number(req.params.id);
    User.findByPk(userIndex)
        .then((user) => {
            if (user) {
                user = user.toJSON();
                res.render('users/edit', { user });
            } else {
                console.log('This user does not exist');
                // render a 404 page
                res.render('404', { message: 'user does not exist' });
            }
        })
        .catch((error) => {
            console.log('ERROR', error);
        });

})

router.get('/:id', (req, res) => {
    console.log('PARAMS', req.params);
    let userIndex = Number(req.params.id);
    console.log('IS THIS A NUMBER?', userIndex);
    User.findByPk(userIndex)
        .then((user) => {
            if (user) {
                user = user.toJSON();
                console.log('IS THIS A USER?', user);
                res.render('users/show', { user });
            } else {
                console.log('This user does not exist');
                // render a 404 page
                res.render('404', { message: 'user does not exist' });
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
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        initials: req.body.initials,
        phoneNumber: req.body.phoneNumber,
        userLevel: Number(req.body.userLevel),
        email: req.body.email,
        password: req.body.password,
    })
        .then((newUser) => {
            console.log('NEW USER', newUser.toJSON());
            newUser = newUser.toJSON();
            res.redirect(`/user/${newUser.id}`);
        })
        .catch((error) => {
            console.log('ERROR', error);
            res.render('404', { message: 'User was not added please try again...' });
        });
    // res.redirect()
});
/**
 * EDIT
 * */
router.put('/edit/:id', (req, res) => {
    console.log('EDIT FORM DATA THAT WAS SUBMITTED', req.body);
    console.log('HERE IS THE ID', req.params.id);
    let userIndex = Number(req.params.id);
    User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        initials: req.body.initials,
        phoneNumber: req.body.phoneNumber,
        userLevel: Number(req.body.userLevel),
        email: req.body.email,
        password: req.body.password,
    }, { where: { id: userIndex } })
        .then((response) => {
            console.log('AFTER UPDATE', response);
            res.redirect(`/user/${userIndex}`);
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
    let userIndex = Number(req.params.id);
    User.destroy({ where: { id: userIndex } })
        .then((response) => {
            console.log('User DELETED', response);
            res.redirect('/users');
        })
        .catch((error) => {
            console.log('ERROR', error);
            res.render('404', { message: 'User was not deleted, please try again...' });
        })
});

module.exports = router;