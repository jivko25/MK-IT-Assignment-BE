const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title : {
        type : String,
        require : true
    },
    year : {
        type : Number,
        require : true
    },
    genre : {
        type : Array,
        require : true,
        default : []
    },
    time : {
        type : Number,
        require : true
    },
    image : {
        type : String,
        require : true
    },
    description : {
        type : String,
        require : true,
        min : 10
    },
    officialSite : {
        type : String,
        require : true
    },
    ownerId : {
        type : String,
        require : true
    }
})

module.exports = mongoose.model('Movies', movieSchema);