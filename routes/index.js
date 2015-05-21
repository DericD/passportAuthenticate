var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/login', function(req, res, next) {
    res.render('login', {
        title: 'Contact'
    });
});

router.get('/signup', function(req, res, next) {
    res.render('signup', {
        title: 'Sign up'
    });
});

router.get('/profile', function(req, res, next) {
    res.render('profile', {
        title: 'Profile'
    });
});


module.exports = router;
