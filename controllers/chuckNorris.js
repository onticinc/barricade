const express = require('express');
const router = express.Router();
const { Chuck } = require('../models');
const fetch = require('node-fetch');

/**
 * ============================
 * CHUCK Controller
 * ============================
*/

router.get('/', (req, res) => {
    fetch('https://api.chucknorris.io/jokes/random')
        .then(async (response) => {
            if (response.status === 200) {
                //console.log('success response', await response.json());
                res.json(await response.json());
            } else {
                console.log('unsucessful response');
            }
        })
        .catch((err) => {
            console.log("Error", err);
        })
});

module.exports = router;