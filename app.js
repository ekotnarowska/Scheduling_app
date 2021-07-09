const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const crypto = require('crypto');

const hbs = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        counter: (index) => index + 1,
    
    }
})

const { users, schedules } = require('./data')

module.exports = app;

//Handlebars Middleware
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//HomePage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Schedule website',
    subtitle: 'Welcome to our website'
}));


//Users Route
app.get('/users', (req, res) => res.render('users', {
    title: 'Users',
    users
}));

//New user Route

app.get('/users/new', (req, res) => res.render('user_form'));


//Single User Route
// app.get('/users/:id', (req, res) => res.render('user', {
//     title: 'User'
// }));

//schedules Route
app.get('/schedules', (req, res) => res.render('schedules', {
    title: 'Schedules',
    schedules
}));

//New Schedule Route
app.get('/schedules/new', (req, res) => res.render('schedule_form'));

// app.get('/', (req, res,) => {
//     res.send('<h1>Welcome to our schedule website<h1>')
// })

//Get all users
app.get('/users', (req, res) => {
    res.send(users)
})

//Get all schedules
app.get('/schedules', (req, res) => {
    res.send(schedules, users)
})

//Get single user
app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId
    const user = users[userId]

    if(user === undefined) {
        // res.status(404).send(`Incorrect user id: ${userId}` )
        res.render('error', {
            userError: true,
            event: 'user',
            id: userId
        })
    }
    // res.json(user)
    res.render('user', {
        title: 'User',
        user
    })
})

//Get schedules for user
app.get('/users/:userId/schedules', (req, res) => {
    const userId = req.params.userId
    const found = schedules.some(schedule => schedule.user_id === parseInt(userId))

    if(found) {
        res.json(schedules.filter(schedule => schedule.user_id === parseInt(userId)));
    } else {
        // res.status(404).send(`No schedule for user with the the id of: ${userId}`)
        res.render('error', {
            scheduleError: true,
            event: 'schedule',
            id: userId})

    }
})

//Create new schedule

app.post('/schedules', (req, res) => {
    const newSchedule = {
        user_id: req.body.user_id,
        day: req.body.day,
        start_at: req.body.start_at,
        end_at: req.body.end_at
    }
    schedules.push(newSchedule)
    res.json(schedules)
})

//Create new user
app.post('/users', (req, res) => {
    const crypto_password = crypto.createHash('sha256').update(req.body.password).digest('base64')
    const newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: crypto_password
    }
    users.push(newUser)
    // res.json(users)
    res.redirect('/users')
})

app.use((req, res, next) => {
    res.status(404).render('error')
})



