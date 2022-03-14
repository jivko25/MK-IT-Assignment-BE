const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;


app.get('/' , (req, res) => {
    res.send('test')
})

mongoose.connect(process.env.MongoDBUrl, () => {
    console.log('Connected to MongoDB');
})

app.listen(PORT, () => {console.log(`Server is running on PORT ${PORT}`)})