const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: '../uploads' })
const { Event } = require('../models');

/**
 * ============================
 * event Controller
 * ============================
*/

// event route
router.get('/', (req, res) => {
    // get all events
    Event.findAll()
        .then((eventList) => {
            console.log('FOUND ALL events', eventList);
            // res.json({ event: eventList });
            res.render('events/index', { events: eventList })
        })
        .catch((err) => {
            console.log('ERROR', err);
            res.json({ message: 'Error occured, please try again....' });
        });
});

router.get('/new', (req, res) => {
    res.render('events/new');
});

// GET to Edit page
router.get('/edit/:id', (req, res) => {
    let eventIndex = Number(req.params.id);
    event.findByPk(eventIndex)
        .then((event) => {
            if (event) {
                event = event.toJSON();
                res.render('events/edit', { event });
            } else {
                console.log('This event does not exist');
                // render a 404 page
                res.render('404', { message: 'event does not exist' });
            }
        })
        .catch((error) => {
            console.log('ERROR', error);
        });

})

router.get('/:id', (req, res) => {
    console.log('PARAMS', req.params);
    let eventIndex = Number(req.params.id);
    console.log('IS THIS A NUMBER?', eventIndex);
    event.findByPk(eventIndex)
        .then((event) => {
            if (event) {
                event = event.toJSON();
                console.log('IS THIS A event?', event);
                res.render('events/show', { event });
            } else {
                console.log('This event does not exist');
                // render a 404 page
                res.render('404', { message: 'event does not exist' });
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
    Event.create({
        name: req.body.name,
        description: req.body.description,
        link: req.body.link,
        cost: req.body.cost,
        picture: req.body.picture,
        date: req.body.date,
        time: req.body.time,
        notes: req.body.notes,
    })
        .then((newevent) => {
            console.log('NEW event', newevent.toJSON());
            newevent = newevent.toJSON();
            res.redirect(`/events/${newevent.id}`);
        })
        .catch((error) => {
            console.log('ERROR', error);
            res.render('404', { message: 'event was not added please try again...' });
        });
    // res.redirect()
});
/**
 * EDIT
 * */
router.put('/:id', (req, res) => {
    //console.log('EDIT FORM DATA THAT WAS SUBMITTED', req.body);
    //console.log('HERE IS THE ID', req.params.id);
    let eventIndex = Number(req.params.id);
    Event.update({
        name: req.body.name,
        description: req.body.description,
        link: req.body.link,
        cost: req.body.cost,
        picture: req.body.picture,
        date: req.body.date,
        time: req.body.time,
        notes: req.body.notes,
    }, { where: { id: eventIndex } })
        .then((response) => {
            console.log('AFTER UPDATE', response);
            res.redirect(`/events/${eventIndex}`);
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
    let eventIndex = Number(req.params.id);
    Event.destroy({ where: { id: eventIndex } })
        .then((response) => {
            console.log('event DELETED', response);
            res.redirect('/events');
        })
        .catch((error) => {
            console.log('ERROR', error);
            res.render('404', { message: 'event was not deleted, please try again...' });
        })
});

module.exports = router;