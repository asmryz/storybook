const router = require('express').Router()
const {ensureAuth, ensureGuest}  = require('../middleware');

// @desc  Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res)=>{
    res.render('login', {
        layout: 'login'
    });
});

// @desc  Dashboard
// @route   GET /dashdoard
router.get('/dashboard', ensureAuth, (req, res)=>{
    res.render('dashboard');
});

module.exports = router;