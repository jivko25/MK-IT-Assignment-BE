const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const Movie = require('../models/MovieModel');
const movieValidation = require('../validations/movieValidation');

//Get all movies of user by ownerId
router.get('/:ownerId/movies', async (req, res) => {
    const movies = await Movie.find({ownerId : req.params.ownerId});
    res.send(movies)
})

router.post('/:ownerId/movies', async (req, res) => {
    const userMovies = await User.findOne({_id : req.params.ownerId});

    if(!userMovies) return res.send(`User with id ${req.params.ownerId} does not exist!`);

    const error = movieValidation(req.body);
    if(error) return res.status(400).send(error);

    const movie = new Movie({
        title : req.body.title,
        year : req.body.year,
        genre : req.body.genre,
        time : req.body.time,
        description : req.body.description,
        officialSite : req.body.officialSite,
        ownerId :req.params.ownerId
    })

    try {
        const savedMovie = await movie.save();
        res.send(savedMovie)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;