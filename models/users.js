var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
/**
 * NOTE Users for adding and editing posts
 */
var sourceSchema = new Schema({    
    activated: Boolean, //whether the user is activated     
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        }
    },
    role: {
        type: String,
        enum: ['Admin', 'Coach','Player', 'Tester'],
        default: 'Player'
    },
    notify: {type:Boolean,default:true},
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
}, {
    timestamps: true
});

sourceSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
sourceSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var Users = mongoose.model('Users', sourceSchema);

// make this available to our users in our Node applications
module.exports = Users;