const handleSignin = (db, bcrypt) => (req, res) => { //another way of syntax
    const {email, password} = req.body;

    // Check to make sure email and password are not empty strings
    if (!email || !password) {
        return res.status(400).json('incorrect form submission');
    }

    // Not a transaction since we are just checking, not modifying any of the database items.
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash); //compare password with hashed password
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('wrong credentials');
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
};


module.exports = {
    handleSignin: handleSignin
};