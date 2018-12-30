// Idea: return back the user's data. Currently not used on Detect Me AI.

const handleProfile = (req, res, db) => {
    const { id } = req.params;

    db.select('*').from('users')
    .where({ //Still part of the query builder command
        id: id
    })
    .then(user => {
        if (user.length) { //if we actually found a user, meaning the returned array is > 0
            res.json(user[0])
        } else { //user doesn't exist
            res.status(400).json('no user found')
        }
    })
    .catch(err => res.status(400).json('error getting user'))
    
}

module.exports = {
    handleProfile: handleProfile
};