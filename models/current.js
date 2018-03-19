"use strict"
//mongoose shcema on what to store fror pins?
var mongoose = require('mongoose');
var currentDataSchema = mongoose.Schema({
  data:{},
  created:Number
});

//var venueGoers = mongoose.model('going',goingSchema);
module.exports = mongoose.model('currentData',currentDataSchema);
