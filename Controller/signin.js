const handleSignIn = (req, res, db, bcrypt) => {
  db.select('email', 'hash').from('login')
  .where('email', '=', req.body.email)
  .then(data => {
    const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
    if(isValid) {
      return db.select('*').from('users')
        .where('email', '=', req.body.email)
        .then(user => {
          res.json(user)
        })
        .catch(err => res.status(400).json('Something Went Wrong'))
    } else {
     res.status(400).json('Wrong Email/Password')
    }
  })
  .catch(err => res.status(400).json('Wrong Email/Password'))
}




module.exports = {
  handleSignIn: handleSignIn
}