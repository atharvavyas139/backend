var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
/**
 * NOTE This contains the player details for the app
 */
var sourceSchema = new Schema({
    name: String, 
    dob: Date, 
    city: String,
    center: String,
    gender: {
        type: String,
        enum: ['Male', 'Female','Undisclosed'],
        default: 'Undisclosed'
    },
    joining: Date,
    userId: { type: mongoose.Schema.ObjectId, ref: 'userId' }

}, {
    timestamps: true
});

sourceSchema.methods.getCategory = function(cb) {
    var age = getAgeFromDOB(this.dob);
    return cb(gender+'U'+age);
};

sourceSchema.methods.getAge = function(cb) {
    var age = getAgeFromDOB(this.dob);
    return cb(parseInt(age));
};

function getAgeFromDOB(dob){
    return moment(new Date()).diff(moment(this.dob),'years');
}

var Players = mongoose.model('Players', sourceSchema);


// make this available to our users in our Node applications
module.exports = Players;