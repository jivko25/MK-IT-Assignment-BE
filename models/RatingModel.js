const mongoose = require('mongoose');

const RatingSchema = mongoose.Schema({
    movieId : {
        type : String,
        require : true
    },
    content : {
        type : Number,
        require : true,
        min : 0,
        max : 5,
        default : 0
    }
})

module.exports = mongoose.model('Ratings', RatingSchema);