const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const postgres = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',  //127.0.0.1 is localhost
      user : 'eddie',
      password : '',
      database : 'smart-brain'
    }
  });

console.log(postgres.select('*').from('users'));

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'john',
            password: 'cookies',
            email: 'john@gmail.com',
            entries: 0, 
            joined: new Date()
        },
        {
            id: '124',
            name: 'sally',
            password: 'bananas',
            email: 'sally@gmail.com',
            entries: 0, 
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
};

app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json(database.users[0]);
    } else {
        res.status(400).json('fail to log in');
    }
});

app.post('/register', (req, res) => {
    const {email, name, password} = req.body; 
    
    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0, 
        joined: new Date()
    });
    res.json(database.users[database.users.length-1])
});

app.get('/profile/:id', (req, res) => { //not implemented w/ frontend
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    });
    if (!found) {
    return res.status(404).json('no such user');
    }
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if (!found) {
        return res.status(404).json('no such user');
    }
}); 




app.listen(3001, () => {
    console.log('app is running on port 3001');
});
