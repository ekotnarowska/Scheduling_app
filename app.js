const express = require('express');
const app = express();
const favicon = require('serve-favicon')
const path = require('path');
const exphbs = require('express-handlebars');

const { users, schedules } = require('./data');

//Handlebars Helpers
const { counter, showDays } = require('./helpers/hbs')

//Handlebars Middleware
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        counter,
        showDays
    }
})
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

//Add Favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
//
app.use(express.static(path.join(__dirname, 'public')));


// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//Routes
app.use('/', require('./routes/index'))
app.use('/schedules', require('./routes/schedules'))
app.use('/users', require('./routes/users'))


//Single User Route
// app.get('/users/:id', (req, res) => res.render('user', {
//     title: 'User'
// }));
// app.get('/', (req, res,) => {
//     res.send('<h1>Welcome to our schedule website<h1>')
// })

//Get all users
// app.get('/users', (req, res) => {
//     res.send(users)
// })

//Get all schedules
// app.get('/schedules', (req, res) => {
//     res.send(schedules, users, days)
// })

module.exports = app;

