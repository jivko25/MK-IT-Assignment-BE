const supertest = require('supertest');
const app = require('./index.js');


//Register

test("should register response with status code 400 if username is shorter than 6 symbols", async () => {
    const body = {
    "username" : "user",
    "password" : "password",
    "email": "jestTest@yahoo.com"
    }
    await supertest(app).post(`/api/user/register`).send(body).expect(400);
})

test("should register response with status code 400 if password is shorter than 6 symbols", async () => {
    const body = {
    "username" : "username",
    "password" : "pas",
    "email": "jestTest@yahoo.com"
    }
    await supertest(app).post(`/api/user/register`).send(body).expect(400);
})

test("should register response with status code 400 if email is invalid", async () => {
    const body = {
    "username" : "username",
    "password" : "password",
    "email": "jestTestyahoo.com"
    }
    await supertest(app).post(`/api/user/register`).send(body).expect(400);
})

//TODO uncomment this test and change username and email
// test("should response with status code 200", async () => {
//     //change username and password before test
//     const body = {
//     "username" : "username",
//     "password" : "password",
//     "email": "jestTest@yahoo.com"
//     }
// await supertest(app).post(`/api/user/register`).send(body).expect(200);
// })

test("should register response with status code 400 when trying to register existing user", async () => {
    const body = {
    "username" : "username",
    "password" : "password",
    "email": "jestTest@yahoo.com"
    }
await supertest(app).post(`/api/user/register`).send(body).expect(400);
})

test("should register response with status code 400 when trying to register existing user", async () => {
    const body = {
    "username" : "username",
    "password" : "password",
    "email": "jestTest@yahoo.com"
    }
await supertest(app).post(`/api/user/register`).send(body).expect(400);
})

//Login
test("should login response with status code 200", async () => {
    const body = {
    "password" : "password",
    "email": "jestTest@yahoo.com"
    }
await supertest(app).post(`/api/user/login`).send(body).expect(200);
})

test("should login response with status code 400 with wrong password", async () => {
    const body = {
    "password" : "wrong password",
    "email": "jestTest@yahoo.com"
    }
await supertest(app).post(`/api/user/login`).send(body).expect(400);
})

test("should login response with status code 400 with wrong email", async () => {
    const body = {
    "password" : "password",
    "email": "wrong email"
    }
await supertest(app).post(`/api/user/login`).send(body).expect(400);
})

//Get movies

test("should get movies with status code 200", async () => {
    await supertest(app).get(`/api/user/62374fee08539a0f1e1cfdd4/movies`).set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjM3NGZlZTA4NTM5YTBmMWUxY2ZkZDQiLCJpYXQiOjE2NDc3OTI2NjN9.czRW007LTrrF1xpjRj99QKqQGcoJUqXKBEsipc6XxMM").expect(200);
})

//TODO uncomment this test (its commented to prevent of fulling database with mock data)
//Post movie
// test("should post movie with status code 200", async () => {
//     const body = {
//         "title" : "Titanic",
//         "year" : 2001,
//         "genre" : ["Drama"],
//         "time" : 90,
//         "description" : "Big Ship sink in the ocean",
//         "officialSite" : "https://www.w3schools.com/js/js_comments.asp",
//         "image" : "https://titanic479.files.wordpress.com/2016/05/titanic1.jpg?w=676"
//     }
//     await supertest(app).post(`/api/user/62374fee08539a0f1e1cfdd4/movies`).send(body).set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjM3NGZlZTA4NTM5YTBmMWUxY2ZkZDQiLCJpYXQiOjE2NDc3OTI2NjN9.czRW007LTrrF1xpjRj99QKqQGcoJUqXKBEsipc6XxMM").expect(200);
// })

test("should get status code 400 when try to post movie with incorrect data", async () => {
    const body = {
        "year" : 2001,
        "genre" : ["Drama"],
        "time" : 90,
        "description" : "Big Ship sink in the ocean",
        "officialSite" : "https://www.w3schools.com/js/js_comments.asp",
        "image" : "https://titanic479.files.wordpress.com/2016/05/titanic1.jpg?w=676"
    }
    await supertest(app).post(`/api/user/62374fee08539a0f1e1cfdd4/movies`).send(body).set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjM3NGZlZTA4NTM5YTBmMWUxY2ZkZDQiLCJpYXQiOjE2NDc3OTI2NjN9.czRW007LTrrF1xpjRj99QKqQGcoJUqXKBEsipc6XxMM").expect(400);
})

test("should get status code 400 when try to post movie with incorrect data", async () => {
    const body = {
        "title" : "Titanic",
        "year" : 2001,
        "genre" : "Drama",
        "time" : 90,
        "description" : "Big Ship sink in the ocean",
        "officialSite" : "https://www.w3schools.com/js/js_comments.asp",
        "image" : "https://titanic479.files.wordpress.com/2016/05/titanic1.jpg?w=676"
    }
    await supertest(app).post(`/api/user/62374fee08539a0f1e1cfdd4/movies`).send(body).set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjM3NGZlZTA4NTM5YTBmMWUxY2ZkZDQiLCJpYXQiOjE2NDc3OTI2NjN9.czRW007LTrrF1xpjRj99QKqQGcoJUqXKBEsipc6XxMM").expect(400);
})

test("should get status code 400 when try to post movie with non-existent user", async () => {
    const body = {
        "title" : "Titanic",
        "year" : 2001,
        "genre" : "Drama",
        "time" : 90,
        "description" : "Big Ship sink in the ocean",
        "officialSite" : "https://www.w3schools.com/js/js_comments.asp",
        "image" : "https://titanic479.files.wordpress.com/2016/05/titanic1.jpg?w=676"
    }
    await supertest(app).post(`/api/user/62374fee08559a0f1e1cfdd4/movies`).send(body).set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjM3NGZlZTA4NTM5YTBmMWUxY2ZkZDQiLCJpYXQiOjE2NDc3OTI2NjN9.czRW007LTrrF1xpjRj99QKqQGcoJUqXKBEsipc6XxMM").expect(400);
})


//Change note
test("should get status code 200", async () => {
    const body = {
        "content" : "Good movie"
    }
    await supertest(app).patch(`/api/user/62374fee08539a0f1e1cfdd4/movies/623752cf5d8a62b8243cf524/note`).send(body).set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjM3NGZlZTA4NTM5YTBmMWUxY2ZkZDQiLCJpYXQiOjE2NDc3OTI2NjN9.czRW007LTrrF1xpjRj99QKqQGcoJUqXKBEsipc6XxMM").expect(200);
})


//Change rating
test("should get status code 200", async () => {
    const body = {
        "content" : 3
    }
    await supertest(app).patch(`/api/user/62374fee08539a0f1e1cfdd4/movies/623752cf5d8a62b8243cf524/rating`).send(body).set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjM3NGZlZTA4NTM5YTBmMWUxY2ZkZDQiLCJpYXQiOjE2NDc3OTI2NjN9.czRW007LTrrF1xpjRj99QKqQGcoJUqXKBEsipc6XxMM").expect(200);
})

test("should get status code 400 when send content with value more than 5", async () => {
    const body = {
        "content" : 6
    }
    await supertest(app).patch(`/api/user/62374fee08539a0f1e1cfdd4/movies/623752cf5d8a62b8243cf524/rating`).send(body).set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjM3NGZlZTA4NTM5YTBmMWUxY2ZkZDQiLCJpYXQiOjE2NDc3OTI2NjN9.czRW007LTrrF1xpjRj99QKqQGcoJUqXKBEsipc6XxMM").expect(400);
})


