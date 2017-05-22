var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
/**
 * NOTE This contains the player details for the app
 */
var sourceSchema = new Schema({
    name: String, 
    organizer: String, 
    city: String,
    venue: String,
    datefrom: Date,
    dateto: Date,
    deadline: Date,
    format: String,
    userId: { type: mongoose.Schema.ObjectId, ref: 'userId' }

}, {
    timestamps: true
});


var Tournaments = mongoose.model('Tournaments', sourceSchema);


// make this available to our users in our Node applications
module.exports = Tournaments;