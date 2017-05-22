var mongoose = require('mongoose');
const URL = 'mongodb://localhost:27017/matchpoint';
console.log('connecting to db');
var options = { server: { socketOptions: { keepAlive: 1000, connectTimeoutMS: 3600000 } }, 
                replset: { socketOptions: { keepAlive: 1000, connectTimeoutMS : 3600000 } } }; 
mongoose.Promise = require('bluebird'); //4X faster than native promises
var connection = mongoose.connect(URL,options);
 
// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open');
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ', err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});

// If the Node process ends, close the Mongoose connection
process.on('SIGTERM', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});

exports.disconnect = function(){
  connection.disconnect();
};

