const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const dotenv = require('dotenv');
dotenv.config();



const register = require('./Controller/register');
const signin = require('./Controller/signin');
const profile = require('./Controller/profile');
const image = require('./Controller/image');

const db = knex({
  client: 'pg',
  connection: {
    // host : process.env.RDS_HOSTNAME,
    // port : process.env.RDS_PORT,
    // user : process.env.RDS_USERNAME,
    // password : process.env.RDS_PASSWORD,
    // database : process.env.RDS_DATABASE
    host: 'localhost',
    port: 5432,
    user: 'abdil',
    password: '',
    database: 'faceapp'

  }
});

// db.select('*').from('users').then(data=>console.log(data))
// SQL -> INSERT INTO users (name, email, joined) VALUES ('abdil','abdil@gmail.com', '2023-01-04 11:35:51');

// db('users').insert({name:'majid',email:'majid@mail.com', joined:'2023-01-04 11:36:55'});

// db('users').insert({name:'majid',email:'majid@mail.com', joined:'2023-01-04'})
// db('users')
// .insert({
//   email: 'majid33@mail.com',
//   name: 'majid',
//   joined: new Date()
// })




const insertData = async (name,email) => {
  await db('users').insert({
    name,
    email,
    joined: new Date()
  })
  .returning(['id','name','email'])
  .then(function(){
    db.select('*')
      .from('users')
      .then(data=>console.log(data))
  })
  // return console.log('inse')
}
// // getData()

const showAllUsers = () => {
  db.select('*')
  .from('users')
  .then(data=>console.log(data))
}




const deleteUser = async (name)=>{
  await db('users')
        .where('name',name)
        .del()
        .then(function(){
          showAllUsers()
        })
}

// deleteUser('abdil99')
// insertData('abdil99',100);

// getData()

// showAllUsers()



const deleteData = async (name) => {
  await db('users')
        .where('name',name)
        .del()
        .then(function(){
          db.select('*')
            .from('users')
            .then(data=>console.log(data))
        })
        
        // .then(user=> console.log(user))
}

// insertData('majid5','majid5@gmail.com')
// deleteData('majid3')

const app = express();

app.use(cors());
app.use(bodyParser.json());



app.get('/', (req, res) => { res.send('It Works') })


app.post('/signin', (req, res) => signin.handleSignIn(req, res, db, bcrypt))
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db));
app.put('/image', (req, res) => image.handleImage(req, res, db));

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})



app.listen(process.env.PORT || 3001, ()=> {
  console.log(`app is running on port ${process.env.PORT}`);
})




      /* API Roadmap
/         -> res = this is working 
/signin   -> POST = success/fail
/register -> POST = userc
/profile/:id -> GET = user
/image    -> PUT = user

*/

