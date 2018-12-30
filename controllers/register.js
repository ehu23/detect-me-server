const handleRegister = (req, res, db, bcrypt) => {
    const {email, name, password} = req.body;

    // Email, name, password cannot be empty
    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    // get the hash-form of the password using bcrypt
    const hash = bcrypt.hashSync(password);

    // Transactions are used when entering data for multiple tables at once, and if one fails, they all fail. In SQL as well.
    db.transaction(trx => {  //trx used in replace of db for transactions

        //Insert into 'login' table first
        trx.insert({
            hash: hash,
            email: email,
        })
        .into('login') //another syntax to specify where to insert into a database
        .returning('email')

        // Continue with 'users' table, using the email used to make the 'login' entry. Will fail if previous failed, since loginEmail will not be the right email then.
        .then(loginEmail => {
            return trx('users') //works without return since res.json will return, but promises should always have a return, its good coding practice.
            .returning('*') //specifies what should be returned by this query builder command, which ends with 'insert'. '*' returns all columns of the inserted row.
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            }).then(user => {
                res.json(user[0]); //user[0] since remember that KNEX queries return an array that houses the data we asked for. '[0]' since it only has 1 element in the array, the single user we registered as a JS object.
            })
        })
        .then(trx.commit)//if the transaction works, commit changes
        .catch(trx.rollback)//otherwise rollback
    })
    .catch(err => res.status(400).json('unable to register')) //in case theres an error
};

module.exports = {
    handleRegister: handleRegister
};
