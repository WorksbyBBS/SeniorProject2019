const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const handlebars = require('express-handlebars')
const session = require('express-session');
const Sequelize = require('sequelize');
const mysql2 = require('mysql2');
const bcrypt = require('bcrypt');

const homeController = require('./controllers/HomeController');

const app = express();


app.use(express.static(path.join(__dirname, '/public')));

// view engine setup

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    defaultLayout: 'layout', extname: '.hbs', helpers: {
        ifUserIsAdmin: function (userS, userT, options) {
            if (userS === userT) {
                console.log(userS + "===" + userT)
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        },
        ifUserIsManager: function (userS, userT, options) {
            if (userS === userT) {
                console.log(userS + "===" + userT)
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        },
        ifUserIsTrainee: function (userS, userT, options) {
            if (userS === userT) {
                console.log(userS + "===" + userT)
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        },
        ifUserIsTrainer: function (userS, userT, options) {
            if (userS === userT) {
                console.log(userS + "===" + userT)
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        },
        ifScoreIsPass: function (val1, val2, options) {
            if (val1 === val2) {
                console.log(val1 + "===" + val2)
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        },
        ifSkillsIsZero: function (num1, num2, options) {
            if (num1 === num2) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        }
    }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const unityRouter = require('./routes/unity');

//express-session
expressSession = session({
    key: 'user',
    secret: 'mySecretString',
    saveUninitialized: false,
    resave: false
});
app.use(expressSession);


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/unity', unityRouter);

// catch 404 error and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


/*connect to DB to check if the DB has been initialized*/
/*if yes, connect with sequelize. If no, initialize DB */

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'CSE_SP_2019'
});

let db_name = 'sp2019_db';

connection.query('CREATE DATABASE IF NOT EXISTS ??', db_name, function (err) {
    if (err) {
        console.log('error in creating sp2019_db database');
        return;
    }
    console.log('created a new database');

    connection.changeUser({
        database: db_name
    }, function (err) {
        if (err) {
            console.log('error in changing database', err);
            return;
        }
        connection.end();
        console.log('connection terminated successfully');
        // });
    });
});

const db = require('./config/db.config.js');

db.sequelize.authenticate().then(() => {
    console.log('Sequelize Connection has been established successfully to the DB');
})
    .catch(err => {
        console.error('Sequelize Unable to connect to the DB:', err);
    });

db.sequelize.sync({
    force: false, // Don't drop tables even if already exist
}).then(function () {
    homeController.createAdminUser();
});


const port = 8000;
app.listen(port, () => {
    const host = "localhost";
    console.log(`App is running @http://${host}:${port}`);
});

module.exports = app;