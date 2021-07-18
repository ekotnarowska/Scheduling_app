const express = require('express');
const router = express.Router()


const { users, schedules, days, hours } = require('../data');

//@desc Show all schedules
//@route GET/schedules
router.get('/', (req, res) => {
    const withUserNameSchedules = [];
    for (let i = 0; i < schedules.length; i++) {
        schedules[i] = {
            'user_id': schedules[i].user_id,
            'day': schedules[i].day,
            'start_at': schedules[i].start_at,
            'end_at': schedules[i].end_at,
            'user': `${users[schedules[i].user_id].firstname} ${users[schedules[i].user_id].lastname} `,
        }
        withUserNameSchedules.push(schedules[i])
    }

    res.render('schedules/all', {
        title: 'Schedules',
        withUserNameSchedules,
        schedules,
    })
});

//@desc Show add page
//@route GET/schedules/new
router.get('/new', (req, res) => {

    res.render('schedules/add', {
        users,
        schedules,
        days,
        hours,
    })
});


//@desc Show single schedule
//@route GET/schedules/:scheduleId

router.get('/:scheduleId', (req, res) => {
    const scheduleId = req.params.scheduleId
    const schedule = schedules[scheduleId]
    const fullName = users[schedule.user_id].firstname + ' ' + users[schedule.user_id].lastname

    if(schedule === undefined) {
        // res.status(404).send(`Incorrect user id: ${userId}` )
        res.render('error', {
            scheduleError: true,
            event: 'schedule',
            id: scheduleId
        })
    }
    res.render('schedules/single', {
        title: 'Schedule',
        schedule,
        fullName,
        users
    })
})

//@desc Process add schedule form
//@route POST/schedules
router.post('/', (req, res) => {
    const newSchedule = {
        user_id: req.body.participant,
        day: req.body.day,
        start_at: `${req.body.start_at}${req.body.time_start}`,
        end_at: `${req.body.end_at}${req.body.time_end}`
    }
    schedules.push(newSchedule)
    res.redirect('/schedules')
})

module.exports = router;


