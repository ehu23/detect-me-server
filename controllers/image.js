const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.API_KEY_CLARIFAI //key put in through heroku env var.
   });

const handleApiCall = (req, res) => {
app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;

    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries') // Still Part of query builder command, will return entries after of the rows that match the conditional 'where', which should only be one row since ID's are unique.!
    .then(entries => {
        res.json(entries[0]); // Remember, it returns in array-form
    })
    .catch(err => res.status(400).json('unable to get entry count'))
}

module.exports = {
    handleImage : handleImage,
    handleApiCall: handleApiCall
};
