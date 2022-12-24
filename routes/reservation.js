const express = require('express');
const reservationController = require('../controllers/reservation');
const router = express.Router();

router.get('/processed', reservationController.getProcessed);
router.get('/unprocessed', reservationController.getUnprocessed);

router.post('/new', reservationController.new);

module.exports = router;