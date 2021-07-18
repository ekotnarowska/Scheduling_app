const express = require('express');
const router = express.Router()
const crypto = require('crypto');

const { users, schedules, days } = require('../data');


//@desc Show all users
//@route GET/users
router.get('/', (req, res) => res.render('users/all', {
    title: 'Users',
    users
}));

//@desc Show add page
//@route GET/users/new
router.get('/new', (req, res) => res.render('users/add'));


//@desc Show single user
//@route GET/users/:userId
router.get('/:userId', (req, res) => {
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
    res.render('users/single', {
        title: 'User',
        user,
        userId
    })
})

//@desc Show all schedules for user
//@route GET/users/:userId/schedules
router.get('/:userId/schedules', (req, res) => {
    const userId = req.params.userId
    const found = schedules.some(schedule => schedule.user_id === parseInt(userId))

    if(found) {
        const filtered_schedules = schedules.filter(schedule => schedule.user_id === parseInt(userId))
        // res.json(filtered_schedules);
        res.render('schedules/for_user', {
            title: 'Schedules',
            participant: userId,
            filtered_schedules

        })
    } else {
        // res.status(404).send(`No schedule for user with the the id of: ${userId}`)
        res.render('error', {
            scheduleError: true,
            event: 'schedule',
            id: userId})

    }
})

//@desc Process add user form
//@route POST/users
router.post('/', (req, res) => {
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

router.use((req, res, next) => {
    res.status(404).render('error')
})



module.exports = router;