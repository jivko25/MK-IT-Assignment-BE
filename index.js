const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(express.json({ extended: false }));

const user = require('./routes/authentication');
const movies = require('./routes/movies');

app.use('/api/user', user);
app.use('/api/user', movies)

const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.MongoDBUrl, () => {
    // console.log('Connected to MongoDB');
})

app.listen(PORT, () => {console.log(`Server is running on PORT ${PORT}`)})

module.exports = app;