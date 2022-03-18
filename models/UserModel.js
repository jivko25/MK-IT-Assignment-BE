const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        require : true,
        min : 4,
        max : 24
    },
    password : {
        type : String,
        require : true,
        min : 6,
        max : 64
    },
    email : {
        type : String,
        require : true
    }
})

module.exports = mongoose.model('User', userSchema);