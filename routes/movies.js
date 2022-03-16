const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const Movie = require('../models/MovieModel');
const Note = require('../models/NotesModel');
const Rating = require('../models/RatingModel');
const movieValidation = require('../validations/movieValidation');

//Get all movies of user by ownerId
router.get('/:ownerId/movies', async (req, res) => {
    const movies = await Movie.find({ownerId : req.params.ownerId});
    res.send(movies)
})

//Post movie
router.post('/:ownerId/movies', async (req, res) => {

    //Check if user exists
    const userMovies = await User.findOne({_id : req.params.ownerId});
    if(!userMovies) return res.send(`User with id ${req.params.ownerId} does not exist!`);

    //Validate body
    const error = movieValidation(req.body);
    if(error) return res.status(400).send(error);

    //If body is valid create movie
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

        //When movie has been created take its id and add it as movieId in note and rating objects and save them
        const note = Note({
            movieId : savedMovie._id.toString(),
            content : ''
        })
        const rating = Rating({
            movieId : savedMovie._id.toString(),
            content : 0
        })
        try {
            note.save()
            rating.save()
        } catch (error) {
            res.status(400).send(error)
        }
        res.send(savedMovie)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/:ownerId/movies/:movieId', async (req, res) => {
    const deleted = await Movie.deleteOne({_id : req.params.movieId});
    //Remove note and rating of the movie
    await Note.deleteOne({movieId : req.params.movieId});
    await Rating.deleteOne({movieId : req.params.movieId});

    if(deleted.deletedCount == 1) return res.send(`Movie with id ${req.params.movieId} was successfully deleted!`);
    res.send(`Movie with id does not exist!`)
})

//Change note
router.patch('/:ownerId/movies/:movieId/note', async (req, res) => {
    const note = await Note.findOne({movieId : req.params.movieId});

    //Check if changes has been made
    if(note.content == req.body.content){
        //If not - do nothing
        res.send('Nothing has changed');
    }
    else {
        //If change has been made save id
        try {
            note.content = req.body.content;
            await Note.updateOne({movieId : req.params.movieId}, note);
            res.send('Note has changed successfully')
        } catch (error) {
            res.status(400).send(error)
        }
    }
})

//Change rating
router.patch('/:ownerId/movies/:movieId/rating', async (req, res) => {
    const rating = await Rating.findOne({movieId : req.params.movieId});

    if(req.body.content < 0 || req.body.content > 5){
        res.status(400).send('Rating need to be number between 0 and 5')
    }

    //Check if changes has been made
    if(rating.content == req.body.content){
        //If not - do nothing
        res.send('Nothing has changed');
    }
    else {
        //If change has been made save id
        try {
            rating.content = req.body.content;
            await Rating.updateOne({movieId : req.params.movieId}, rating);
            res.send('Rating has changed successfully')
        } catch (error) {
            res.status(400).send(error)
        }
    }
})



module.exports = router;