const express = require('express');
const router = express.Router();
const { Merch } = require('../models');

/**
 * ============================
 * Merch Controller
 * ============================
*/

// Merch route
router.get('/', (req, res) => {
    // get all merch
    Merch.findAll()
        .then((merchList) => {
            console.log('FOUND ALL MERCH', merchList);
            // res.json({ merch: merchList });
            res.render('merch/index', { merch: merchList })
        })
        .catch((err) => {
            console.log('ERROR', err);
            res.json({ message: 'Error occured, please try again....' });
        });
});

router.get('/new', (req, res) => {
    res.render('merch/new');
});

// GET to Edit page
router.get('/merch/:id', (req, res) => {
    let merchIndex = Number(req.params.id);
    Merch.findByPk(merchIndex)
        .then((merch) => {
            if (merch) {
                merch = merch.toJSON();
                res.render('merch/edit', { merch });
            } else {
                console.log('This merch does not exist');
                // render a 404 page
                res.render('404', { message: 'merch does not exist' });
            }
        })
        .catch((error) => {
            console.log('ERROR', error);
        });

})

router.get('/:id', (req, res) => {
    console.log('PARAMS', req.params);
    let merchIndex = Number(req.params.id);
    console.log('IS THIS A NUMBER?', merchIndex);
    Merch.findByPk(merchIndex)
        .then((merch) => {
            if (merch) {
                merch = merch.toJSON();
                console.log('IS THIS A MERCH?', merch);
                res.render('merch/show', { merch });
            } else {
                console.log('This merch does not exist');
                // render a 404 page
                res.render('404', { message: 'merch does not exist' });
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
    Merch.create({
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        price: Number(req.body.price),
        picture: req.body.picture,
        notes: req.body.notes,
        inStock: Number(req.body.abv),
    })
        .then((newMerch) => {
            console.log('NEW MERCH', newMerch.toJSON());
            newMerch = newMerch.toJSON();
            res.redirect(`/merch/${newMerch.id}`);
        })
        .catch((error) => {
            console.log('ERROR', error);
            res.render('404', { message: 'Merch was not added please try again...' });
        });
    // res.redirect()
});
/**
 * EDIT
 * */
router.put('/:id', (req, res) => {
    console.log('EDIT FORM DATA THAT WAS SUBMITTED', req.body);
    console.log('HERE IS THE ID', req.params.id);
    let merchIndex = Number(req.params.id);
    Merch.update({
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        price: Number(req.body.pricePerGlass),
        picture: req.body.picture,
        notes: req.body.notes,
        inStock: Number(req.body.abv),
    }, { where: { id: merchIndex } })
        .then((response) => {
            console.log('AFTER UPDATE', response);
            res.redirect(`/merch/${merchIndex}`);
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
    let merchIndex = Number(req.params.id);
    Merch.destroy({ where: { id: merchIndex } })
        .then((response) => {
            console.log('Merch DELETED', response);
            res.redirect('/merch');
        })
        .catch((error) => {
            console.log('ERROR', error);
            res.render('404', { message: 'Merch was not deleted, please try again...' });
        })
});

module.exports = router;