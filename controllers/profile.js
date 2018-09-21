const handleProfile = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users')
    .where({
        id: id
    })
    .then(user => {
        if (user.length) { //if we actually found a user
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