# MK-IT-Assignment-BE

## Description

**Link** : https://mk-it-assignment-be.vercel.app/

### Why this project is made

This project is back-end part MK-IT-Assignment project.

### Technologies

* Node.js
* Express.js
* MongoDB (Atlas)
* Mongoose
* JsonWebToken(jwt)
* @hapi/joi
* This app is deployed on vercel ptalform

### How to start this project localy

* Download repo
* Use this commands to run app

```
npm i
npm start
```

## How to use

### Register

Send **Post** request to **/api/user/register** with body
```
{
  "email" : {email},
  "username" : {username},
  "password" : {password}
}
```

If request is succesful you will recieve response with in the folowing format:
```
{
    token,
    username,
    email,
    id
}
```

### Login

Send **POST** request to **/api/user/login** with body
```
{
  "email" : {email},
  "password" : {password}
}
```

If request is succesful you will recieve response with in the folowing format:
```
{
    token,
    username,
    email,
    id
}
```

### Get all movies by user

Send **GET** request to **/api/user/:userId/movies**. Its **authorized** request, so you need to send header with key **token** and token you recieved from login/registration.

### Post movie

Send **POST** request to **/api/user/:userId**. Its **authorized** request, so you need to send header with key **token** and token you recieved from login/registration. Schema of the body:

```
{
        "title" : String,
        "year" : Number,
        "genre" : Array,
        "time" : Number,
        "description" : String,
        "officialSite" : String,
        "image" : String
}
```

If request is succesful you will recieve response with in the folowing format:
```
{
    title
    year,
    genre,
    time,
    image,
    description,
    officialSite,
    ownerId,
    _id,
    __v
}
```

### Delete movie

Send **DELETE** request to **/api/user/:userId/movies/:movieId**. Its **authorized** request, so you need to send header with key **token** and token you recieved from login/registration. 

If request is succesful you will recieve response with in the folowing format:

```
Movie with id {movieId} was successfully deleted!
```

### Add/Change note

Send **PATCH** request to **/api/user/:userId/movies/:movieId/note**. Its **authorized** request, so you need to send header with key **token** and token you recieved from login/registration.
Schema of the body:
```
{
  "content" : String
}
```

### Change rating

Send **PATCH** request to **/api/user/:userId/movies/:movieId/rating**. Its **authorized** request, so you need to send header with key **token** and token you recieved from login/registration.
Schema of the body:
```
{
  "content" : Number
}
```

### Get note of movie

Send **GET** request to **/api/user/:userId/movies/:movieId/note**. Its **authorized** request, so you need to send header with key **token** and token you recieved from login/registration.

If request is succesful you will recieve response with in the folowing format:
```
{
    _id,
    movieId,
    content,
    __v
}
```

### Get rating of movie

Send **GET** request to **/api/user/:userId/movies/:movieId/rating**. Its **authorized** request, so you need to send header with key **token** and token you recieved from login/registration.

If request is succesful you will recieve response with in the folowing format:
```
{
    _id,
    movieId,
    content,
    __v
}
```
