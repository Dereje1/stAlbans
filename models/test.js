"use strict"
//mongoose shcema on what to store fror pins?
var mongoose = require('mongoose');
var testSchema = mongoose.Schema({
});

//var venueGoers = mongoose.model('going',goingSchema);
module.exports = mongoose.model('test',testSchema);
