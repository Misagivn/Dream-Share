const express = require('express');
const router = express.Router();
const programmingLanguages = require('../services/programmingLanguages')

/* GET programming languages - by the demo - in this case is phone in database*/
router.get('/', async function(req, res, next){
    try {
        res.json(await programmingLanguages.getMultiple(req.query.page));
    } catch (err) {
        console.error("Error while getting ", err.message);
        next(err);
    }
});

module.exports = router;