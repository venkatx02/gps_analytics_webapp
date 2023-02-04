const express = require('express');
const router = express.Router();

const {getGps, getGpsByID, queryByDevice} = require('../controller/gpsController');
const {protect} = require('../middleware/authMiddleware');

router.get('/', protect, getGps);
router.get('/:id', protect, getGpsByID);
router.get('/query/:id', protect, queryByDevice);

module.exports = router;