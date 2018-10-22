const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '123456',
    database : 'faceapp'
  }
});

db.select('*').from('users').then(data => {
  console.log(data);
})

const app = express();

const database = {
  users: [
    {
      id: '100',
      name: 'Abdil',
      email: 'test@gmail.com',
      password: 'test',
      score: 0,
      regDate: new Date()
    },
    {
      id: '101',
      name: 'Mike',
      email: 'mike@gmail.com',
      password: 'apple',
      score: 0,
      regDate: new Date()
    },
    {
      id: '102',
      name: 'Pam',
      email: 'pam@gmail.com',
      password: 'orange',
      score: 0,
      regDate: new Date()
    }
  ]
}



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());




app.get('/', (req, res) => {
  console.log('Server Running - Port:3000')
  res.send(database.users)
})


app.post('/signin', (req, res) => {
  if(req.body.email === database.users[0].email &&
     req.body.password === database.users[0].password){
      res.json(database.users[0]);
  } else {
      res.status(404).send('Error Wrong Email/Password')
  }
})

app.post('/register', (req, res) => {
  const {name, email, password} = req.body;
  db('users')
    .returning('*')
    .insert({
      email: email,
      name: name,
      joined: new Date()
    })
    .then(user => {
      res.json(user[0]);
    })
    .catch(err => res.status(400).json('unable to register'))
})


app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({
    id: id
  })
    .then(user => {
      res.json(user[0])
  })
  // if(!found) {
  //   return res.status(404).send('User not Found')
  // }
})


app.put('/image', (req, res) =>{
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id){
      found = true;
      user.score++
      return res.json(user.score);
    }
  })
  if(!found) {
    return res.status(404).send('User not Found')
  }
})





app.listen(3001);





      /* API Roadmap
/         -> res = this is working 
/signin   -> POST = success/fail
/register -> POST = user
/profile/:id -> GET = user
/image    -> PUT = user

*/































































