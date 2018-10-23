const handleProfile = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
      .then(user => {
        console.log(user)
        if(user.length === 0){
          res.status(400).json('Not Found')
        } else {
          res.json(user[0])
        }
      })
      .catch(err => res.status(400).json('Error getting user'))
}

module.exports = {
  handleProfile: handleProfile
}