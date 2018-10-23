const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Something went Really wrong'))
}

/*
--> Problem with value increasing, using postman localhost:3001/image, the value increments but when clicking detect button in the app there is an error.
--> issue could be with React(async issue) 
*/


module.exports = {
  handleImage: handleImage
}