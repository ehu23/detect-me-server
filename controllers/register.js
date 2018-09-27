const handleRegister = (req, res, db, bcrypt) => {
    const {email, name, password} = req.body; 
    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    //hashing using bcrypt
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {  //trx used in replace of db for transactions
        trx.insert({
            hash: hash,
            email: email,
        })
        .into('login') //another syntax to specify where to insert into a database
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*') //specifies what should be returned by .insert
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            }).then(user => {
                res.json(user[0]);
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
