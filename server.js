const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex')

const register = require('./Controller/register');
const signin = require('./Controller/signin');
const profile = require('./Controller/profile');
const image = require('./Controller/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '123456',
    database : 'faceapp'
  }
});


const app = express();

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  db.select('*').from('users')
    .then(data => {
      res.json(data)
    })
})


app.post('/signin', (req, res) => signin.handleSignIn(req, res, db, bcrypt))
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db));
app.put('/image', (req, res) => image.handleImage(req, res, db));

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})


const port = process.env.PORT || 3003

app.listen(port, ()=> {
  console.log(`app is running on port ${port}`);
})





      /* API Roadmap
/         -> res = this is working 
/signin   -> POST = success/fail
/register -> POST = user
/profile/:id -> GET = user
/image    -> PUT = user

*/

