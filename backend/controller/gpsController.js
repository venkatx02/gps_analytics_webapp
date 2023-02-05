const asyncHandler = require('express-async-handler');
const Gps = require('../model/gpsModel');
const User = require('../model/userModel');

const getGps = asyncHandler(async (req, res) => {
    const gps = await Gps.find().sort('-Timestamp')
    res.status(200).json(gps);
})

const getGpsByID = asyncHandler(async (req, res) => {
    const gpsdata = await Gps.findById(req.params.id)
    res.status(200).json(gpsdata);
})

const queryByDevice = asyncHandler(async (req, res) => {
    const gpsdata = await Gps.findById(req.params.id)
    const deviceData = await Gps.find({
        DeviceID: gpsdata.DeviceID
    }, {
        Timestamp: 1,
        Location: 1,
    })
    res.status(200).json(deviceData);
})

module.exports = {getGps, getGpsByID, queryByDevice};