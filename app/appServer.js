const configLoader = require("../settings/configLoader");

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const commonUtils = require('./routes/utils/commonUtils');

const User = require('./storage/mongodb/model/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Response = require('./routes/model/Response');

const rootRouter = require('./routes/rootRouter');
const usersRouter = require('./routes/usersRouter');
const motorcyclesRouter = require('./routes/motorcyclesRouter');

const config = configLoader.getConfig().appServer;
const app = express();

app.all('*', (req, res, next) => {
    if (req.secure) {
        return next();
    }
    res.redirect(`https://${req.hostname}:${app.get('secPort')}${req.url}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser(config.secureKey));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json(), bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/', rootRouter);
app.use('/users', usersRouter);
app.use('/motorcycles', motorcyclesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        var error = {
            message: err.message,
            error: err
        };
        res.status(err.status || 500).json(new Response(error, undefined));
    });
}

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(new Response(err.message, undefined));
});

module.exports = app;
