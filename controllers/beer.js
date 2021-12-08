const express = require('express');
const router = express.Router();
const { Beer } = require('../models');

/**
 * ============================
 * Beer Controller
 * ============================
*/

// beer route
router.get('/', (req, res) => {
    // get all beers
    Beer.findAll()
        .then((beerList) => {
            console.log('FOUND ALL Beers', beerList);
            // res.json({ beer: beerList });
            res.render('beer/index', { beers: beerList })
        })
        .catch((err) => {
            console.log('ERROR', err);
            res.json({ message: 'Error occured, please try again....' });
        });
});

router.get('/new', (req, res) => {
    res.render('beers/new');
});

// GET to Edit page
router.get('/edit/:id', (req, res) => {
    let beerIndex = Number(req.params.id);
    Beer.findByPk(beerIndex)
        .then((beer) => {
            if (beer) {
                beer = beer.toJSON();
                res.render('beers/edit', { beer });
            } else {
                console.log('This Beer does not exist');
                // render a 404 page
                res.render('404', { message: 'Beer does not exist' });
            }
        })
        .catch((error) => {
            console.log('ERROR', error);
        });

})

router.get('/:id', (req, res) => {
    console.log('PARAMS', req.params);
    let beerIndex = Number(req.params.id);
    console.log('IS THIS A NUMBER?', beerIndex);
    Beer.findByPk(beerIndex)
        .then((beer) => {
            if (beer) {
                beer = beer.toJSON();
                console.log('IS THIS A BEER?', beer);
                res.render('beers/show', { beer });
            } else {
                console.log('This beer does not exist');
                // render a 404 page
                res.render('404', { message: 'Beer does not exist' });
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
    Beer.create({
        name: req.body.name,
        type: req.body.type,
        brewery: req.body.type,
        pricePerGlass: Number(req.body.pricePerGlass),
        pricePerGrowler: Number(req.body.pricePerGlass),
        costPerKeg: Number(req.body.costPerKeg),
        abv: Number(req.body.abv),
        ibu: Number(req.body.ibu),
        notes: req.body.notes,
    })
        .then((newBeer) => {
            console.log('NEW BEER', newBeer.toJSON());
            newBeer = newBeer.toJSON();
            res.redirect(`/beers/${newBeer.id}`);
        })
        .catch((error) => {
            console.log('ERROR', error);
            res.render('404', { message: 'Beer was not added please try again...' });
        });
    // res.redirect()
});
/**
 * EDIT
 * */
router.put('/:id', (req, res) => {
    console.log('EDIT FORM DATA THAT WAS SUBMITTED', req.body);
    console.log('HERE IS THE ID', req.params.id);
    let beerIndex = Number(req.params.id);
    Beer.update({
        name: req.body.name,
        type: req.body.type,
        brewery: req.body.type,
        pricePerGlass: Number(req.body.pricePerGlass),
        pricePerGrowler: Number(req.body.pricePerGlass),
        costPerKeg: Number(req.body.costPerKeg),
        abv: Number(req.body.abv),
        ibu: Number(req.body.ibu),
        notes: req.body.notes,
    }, { where: { id: beerIndex } })
        .then((response) => {
            console.log('AFTER UPDATE', response);
            res.redirect(`/beers/${beerIndex}`);
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
    let beerIndex = Number(req.params.id);
    Beer.destroy({ where: { id: beerIndex } })
        .then((response) => {
            console.log('BEER DELETED', response);
            res.redirect('/beers');
        })
        .catch((error) => {
            console.log('ERROR', error);
            res.render('404', { message: 'Beer was not deleted, please try again...' });
        })
});

module.exports = router;