const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const registerValidation = require('../validations/registerValidation');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    //Get user that want to login
    const userToLogin = await User.findOne({email : req.body.email});

    //Check if user with this email exist
    if(!userToLogin) return res.status(400).send('User with this email does not exist!');

    //Check if password is correct
    if(userToLogin.password != req.body.password) return res.status(400).send('Wrong email or password!');

    //If everything is correct create token and send it
    const token = jwt.sign({_id : userToLogin._id}, process.env.secret);
    res.send({
        token,
        username : userToLogin.username
    });

});

router.post('/register', async (req, res) => {
    //Validate body
    const error = registerValidation(req.body);
    if(error) return res.status(400).send(error);

    //Check if email exists
    const checkIfEmailExist = await User.findOne({email : req.body.email});
    if(checkIfEmailExist) return res.status(400).send(`User with email ${req.body.email} already exist`);

    //Check if username exists
    const checkIfUserNameExist = await User.findOne({username : req.body.username});
    if(checkIfUserNameExist) return res.status(400).send(`User with username ${req.body.username} already exist`);

    //Create user
    const user = new User({
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
    })
    try {
        await user.save();

        //Create token
        const getIdOfTheNewUser = User.findOne({email : req.body.email})
        const token = jwt.sign({_id : getIdOfTheNewUser._id}, process.env.secret);
        res.send({
            token,
            username : req.body.username
        });
    } catch (error) {
        res.status(400).send(error)
    }
});


module.exports = router;