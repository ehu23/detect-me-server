const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// KNEX allows us to interact on a high level with our database
const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,  //127.0.0.1 is localhost. connectionString instead of host for heroku.
      ssl: true // Needed for heroku
    }
  });
/*
To Connect to local datastore using Knex, just change the connection property above to:

    connection: {
        host: '127.0.0.1',
        user: 'DATABASE USER, i.e. eddie',
        password: 'PASSWORD TO THE DATABASE',
        database: 'DATABASE NAME'
    }

 */

/* To quickly test if db is connected with KNEX:
// KNEX query building syntax returns a promise. But since we are not working through HTTPS, we do not need to convert th JSON. Just returns whatever is requested in an array.
 db.select('*').from('users').then(data => {
     console.log(data);
 });
*/
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); //we need this in order to tell the browser that is running the frontend that its ok to access this server, which is running somewhere else.

app.get('/', (req, res) => {res.send('server is up!')} );

// Note: /signin is a POST and not a GET because we do not want to send credentials via GET. Safer if sent in the body via POST.
app.post('/signin', signin.handleSignin(db, bcrypt)); //another way of syntax. Run function with db and bcrypt, then when the post comes, pass it two more parameters - req, res (implied).
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)}); //called dependency injection into the function
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)}); //not implemented w/ frontend. For future developments.
app.put('/image', (req, res) => {image.handleImage(req, res, db)}); 
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)}); 


const PORT = process.env.PORT; //heroku puts it the port automatically into this variable, i.e. it runs the command `PORT=3000 node server.js`
app.listen(PORT || 3001, () => { //default is 3001 if PORT is not specified.
    console.log(`app is running on port ${PORT}`);
});
