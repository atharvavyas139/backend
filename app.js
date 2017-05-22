var db = require('./models/db');
var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var _ = require('underscore');
var child_process = require('child_process');
var session = require('express-session');
var passport = require('passport');
var sitemap = require('express-sitemap');
//upload profile or other images
var upload = multer({
    storage: multer.memoryStorage(),
    fieldSize: 1,
    fileSize: 1000000,
    fileFilter: function(req, file, cb) {
        var accept = /image/i.test(file.mimetype);
        return cb(null, accept);
    }
});

//Port for server to run on
const port = process.env.PORT || 8080;


//use bodyparser to get forms
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true,
    parameterLimit: 10000,
    limit: 1024 * 1024 * 10
}));
app.use(bodyParser.json());

app.use(session({
    secret: 'matchpoint',
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 720000000
    }
})); // session secret
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//Set Express views
app.set('views', __dirname + '/views');
//Set user as a variable for all routes, if user is logged in
app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});
var server = require('http').createServer(app);
var io = require('socket.io')(server);
//start socket.io connections in all controllers
maincontroller.start(io);


/**
 * POST routers
 * TODO add routes
 */
app.post('/', maincontroller.processApi);

/**
 * GET routers
 * TODO add routes
 */
app.get('/', maincontroller.renderHome);


server.listen(port, function() {
    postload(function(err, message) {
        console.log('Listening on port', port);
    });
});



/**
 * Postload any neural nets as soon as the server starts, in order to update any changes
 * in neural networks
 * @param {any} callback 
 */
function postload(callback) {
    return callback(null,true);
}

/**
 * Sets Cross origin for both preflight and normal requests
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */
function setResponseCrossOrigin(req,res,next){
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log('Setting cross origin response for ',req.method);
    if('OPTIONS' === req.method)
    res.sendStatus(200);
    else
    next();
}


/**
 * Connect to the socket.io client on the client side
 */
io.on('connection', function(client) {
    client.on('join', function(data) {
        console.log(data);
    });
});