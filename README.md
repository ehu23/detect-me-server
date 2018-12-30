# API for Detect Me AI

## Description:

- This is the Node.js server to the face detecting AI web app, Detect Me AI. 
- Express.js is the framework used. 
- Knex.js is used as the SQL query builder for the PostgreSQL database this is connected to (which is currently provisioned for this app through heroku's Postgresql addon).
- Bcrypt is used to hash user's passwords before storing them.
- The server is currently deployed on: https://rocky-escarpment-90953.herokuapp.com, with the front end web app on: https://detect-me.herokuapp.com 


## API Calls:
- All calls are custom to Detect Me AI, and not meant to be publicly used. See implementation and/or use personally if you so desire.

- Currently Available: '/signin' (POST), '/register' (POST), '/image' (PUT), '/imageurl' (POST)
- To be implemented: '/profile/:id' (GET)

## For local deployment (a little tricky):

1. `npm install`
2. `npm test` runs the server using nodemon on port 3001 (be sure to comment out the heroku PORT environmental variable).
3. Clarifai's API KEY is currently invoked through the API_KEY_CLARIFAI environment variable.
4. Knex is currently connecting to heroku's postgres datastore that I configured, will need to change the connection to your own datastore since I do not provide the url (its an environemntal variable instead)

## Future Updates:

- Maybe more APIs for the frontend.
- Change the url to something more descriptive once the server becomes more awesome.

## Built With

* [Node.js](https://nodejs.org) - The Javascript Runtime Environment used for server-side scripting.
* [Express.js](https://expressjs.com) - The web application framework for Node.js used
* [Knex.js](https://knexjs.org) - The SQL query builder used for Postgres.

## Contributing

Feel free to send pull requests!

## Versioning

[SemVer](http://semver.org/) for versioning.

## Authors

* **Edward Hu** - *All Development* - [ehu23](https://github.com/ehu23)
