const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');

router.post('/login', (req, res) => {
    res.send('login')
});

router.post('/register', async (req, res) => {
    const user = new User({
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        movies : []
    })
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send('Error')
    }
});


module.exports = router;