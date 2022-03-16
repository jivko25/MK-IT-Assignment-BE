const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({
    movieId : {
        type : String,
        require : true
    },
    content : {
        type : String
    }
})

module.exports = mongoose.model('Notes', NotesSchema);