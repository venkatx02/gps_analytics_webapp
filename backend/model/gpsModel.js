const mongoose = require('mongoose');

const gpsSchema = mongoose.Schema({
    DeviceID: {type: String},
    DeviceType: {type: String},
    Timestamp: {type: String},
    Location: {type: String}
    }, {})

module.exports = mongoose.model('Gps', gpsSchema);