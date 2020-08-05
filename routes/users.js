var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback', passport.authenticate('google'),(req, res) => {
    res.redirect('/'); 
});


router.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


router.get('/api/current_user', (req, res) => {
  res.send(req.user);
});
module.exports = router;
