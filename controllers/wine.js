const express = require('express');
const router = express.Router();
const { Wine } = require('../models');

/**
 * ============================
 * Wine Controller
 * ============================
*/

// Wine route
router.get('/', (req, res) => {
    // get all wines
    Wine.findAll()
        .then((wineList) => {
            console.log('FOUND ALL WINES', wineList);
            // res.json({ wine: wineList });
            res.render('wines/index', { wines: wineList })
        })
        .catch((err) => {
            console.log('ERROR', err);
            res.json({ message: 'Error occured, please try again....' });
        });
});

router.get('/new', (req, res) => {
    res.render('wines/new');
});

// GET to Edit page
router.get('/edit/:id', (req, res) => {
    let wineIndex = Number(req.params.id);
    Wine.findByPk(wineIndex)
        .then((wine) => {
            if (wine) {
                wine = wine.toJSON();
                res.render('wines/edit', { wine });
            } else {
                console.log('This wine does not exist');
                // render a 404 page
                res.render('404', { message: 'Wine does not exist' });
            }
        })
        .catch((error) => {
            console.log('ERROR', error);
        });

})

router.get('/:id', (req, res) => {
    console.log('PARAMS', req.params);
    let wineIndex = Number(req.params.id);
    //console.log('IS THIS A NUMBER?', wineIndex);
    Wine.findByPk(wineIndex)
        .then((wine) => {
            if (wine) {
                wine = wine.toJSON();
                console.log('IS THIS A WINE?', wine);
                res.render('wines/show', { wine });
            } else {
                console.log('This wine does not exist');
                // render a 404 page
                res.render('404', { message: 'Wine does not exist' });
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
    Wine.create({
        name: req.body.name,
        type: req.body.type,
        winery: req.body.winery,
        pricePerGlass: Number(req.body.pricePerGlass),
        pricePerBottle: Number(req.body.pricePerBottle),
        abv: Number(req.body.abv),
        ava: Number(req.body.ava),
        notes: req.body.notes,
        status: req.body.status,
    })
        .then((newWine) => {
            console.log('NEW WINE', newWine.toJSON());
            newWine = newWine.toJSON();
            res.redirect(`/wines/${newWine.id}`);
        })
        .catch((error) => {
            console.log('ERROR', error);
            res.render('404', { message: 'Wine was not added please try again...' });
        });
    // res.redirect()
});
/**
 * EDIT
 * */
router.put('/edit', (req, res) => {
    console.log('EDIT FORM DATA THAT WAS SUBMITTED', req.body);
    console.log('HERE IS THE ID', req.params.id);
    let wineIndex = Number(req.params.id);
    Wine.update({
        name: req.body.name,
        type: req.body.type,
        winery: req.body.winery,
        pricePerGlass: Number(req.body.pricePerGlass),
        pricePerBottle: Number(req.body.pricePerBottle),
        abv: Number(req.body.abv),
        ava: req.body.ava,
        notes: req.body.notes,
        status: req.body.status,
    }, { where: { id: wineIndex } })
        .then((response) => {
            console.log('AFTER UPDATE', response);
            res.redirect(`/wines/${wineIndex}`);
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
    let wineIndex = Number(req.params.id);
    Wine.destroy({ where: { id: wineIndex } })
        .then((response) => {
            console.log('WINE DELETED', response);
            res.redirect('/wines');
        })
        .catch((error) => {
            console.log('ERROR', error);
            res.render('404', { message: 'Wine was not deleted, please try again...' });
        })
});

module.exports = router;