const express = require('express');
const router = express.Router()


//HomePage Route
router.get('/', (req, res) => res.render('index', {
    title: 'Schedule website',
    subtitle: 'Welcome to our website'
}));




module.exports = router;