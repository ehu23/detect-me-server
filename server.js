const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',  //127.0.0.1 is localhost
      user : 'postgres',
      password : 'postgres',
      database : 'face-recognition-brain-db'
    }
  });

// db.select('*').from('users').then(data => { //to test if db is connected/working
//     console.log(data);
// });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', signin.handleSignin(db, bcrypt)); //another way of syntax. Run function with db and bcrypt, then when the post comes, pass it two more parameters - req, res (implied).
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)}); //called dependency injection into the function
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)}); //not implemented w/ frontend. For future developments.
app.put('/image', (req, res) => {image.handleImage(req, res, db)}); 

app.listen(3001, () => {
    console.log('app is running on port 3001');
});
