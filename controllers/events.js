const express = require('express');
const router = express.Router();
const { Album } = require('../models');

/**
 * ============================
 * Albums
 * ============================
*/

// /albums route
router.get('/', (req, res) => {
    // get all albums
    Album.findAll()
        .then((albumList) => {
            console.log('FOUND ALL ALBUMS', albumList);
            // res.json({ albums: albumList });
            res.render('albums/index', { albums: albumList })
        })
        .catch((err) => {
            console.log('ERROR', err);
            res.json({ message: 'Error occured, please try again....' });
        });
});

router.get('/new', (req, res) => {
    res.render('albums/new');
});

// GET to Edit page
router.get('/edit/:id', (req, res) => {
    let albumIndex = Number(req.params.id);
    Album.findByPk(albumIndex)
        .then((album) => {
            if (album) {
                album = album.toJSON();
                res.render('albums/edit', { album });
            } else {
                console.log('This album does not exist');
                // render a 404 page
                res.render('404', { message: 'Album does not exist' });
            }
        })
        .catch((error) => {
            console.log('ERROR', error);
        });

})


router.get('/:id', (req, res) => {
    console.log('PARAMS', req.params);
    let albumIndex = Number(req.params.id);
    console.log('IS THIS A NUMBER?', albumIndex);
    Album.findByPk(albumIndex)
        .then((album) => {
            if (album) {
                album = album.toJSON();
                console.log('IS THIS A ALBUM?', album);
                res.render('albums/show', { album });
            } else {
                console.log('This album does not exist');
                // render a 404 page
                res.render('404', { message: 'Album does not exist' });
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
    Album.create({
        title: req.body.title,
        length: Number(req.body.length),
        tracks: Number(req.body.tracks),
        year: Number(req.body.year)
    })
        .then((newAlbum) => {
            console.log('NEW ALBUM', newAlbum.toJSON());
            newAlbum = newAlbum.toJSON();
            res.redirect(`/albums/${newAlbum.id}`);
        })
        .catch((error) => {
            console.log('ERROR', error);
            res.render('404', { message: 'Album was not added please try again...' });
        });
    // res.redirect()
});
/**
 * EDIT
 * */
router.put('/:id', (req, res) => {
    console.log('EDIT FORM DATA THAT WAS SUBMITTED', req.body);
    console.log('HERE IS THE ID', req.params.id);
    let albumIndex = Number(req.params.id);
    Album.update({
        title: req.body.title,
        length: Number(req.body.length),
        tracks: Number(req.body.tracks),
        year: Number(req.body.year)
    }, { where: { id: albumIndex } })
        .then((response) => {
            console.log('AFTER UPDATE', response);
            res.redirect(`/albums/${albumIndex}`);
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
    let albumIndex = Number(req.params.id);
    Album.destroy({ where: { id: albumIndex } })
        .then((response) => {
            console.log('ALBUM DELETED', response);
            res.redirect('/albums');
        })
        .catch((error) => {
            console.log('ERROR', error);
            res.render('404', { message: 'Album was not deleted, please try again...' });
        })
});

module.exports = router;