README

This is the node server to the face finder AI web app. Express is used as a framework for node. Knex is used as the SQL query builder for the PostgreSQL database this is connected to.


Some things to keep in mind:

    1. Default "npm start" script runs the server using nodemon on port 3001. To change the port, use the environment variable PORT.

    2. Clarifai's API KEY is currently invoked through the API_KEY_CLARIFAI environment variable.

    3. Current setup is run on heroku.
