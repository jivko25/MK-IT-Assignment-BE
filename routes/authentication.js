const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const registerValidation = require('../validations/registerValidation');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    res.send('login')
});

router.post('/register', async (req, res) => {
    //Validate body
    const error = registerValidation(req.body);
    if(error) return res.status(400).send(error);

    //Check if email exists
    const checkIfEmailExist = await User.findOne({email : req.body.email});
    if(checkIfEmailExist) return res.send(`User with email ${req.body.email} already exist`);

    //Check if username exists
    const checkIfUserNameExist = await User.findOne({username : req.body.username});
    if(checkIfUserNameExist) return res.send(`User with username ${req.body.username} already exist`);

    const user = new User({
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        movies : []
    })
    try {
        await user.save();
        const test = User.findOne({email : req.body.email})
        const token = jwt.sign({_id : test._id}, process.env.secret);
        res.send({
            token,
            username : req.body.username
        });
    } catch (error) {
        res.status(400).send(error)
    }
});


module.exports = router;