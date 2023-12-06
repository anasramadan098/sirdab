const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb+srv://anas_ramadan:JRZ2OslS7Ihj1HKa@anas.xuujkta.mongodb.net/';
const client = new MongoClient(url);

async function register(email,password) {
  // Connect
  await client.connect();
  const db = client.db('sardab');
  const collection = db.collection('clients');
  let users = await collection.find().toArray();
    // Find User
    let findUser = users.find((data) => email == data.email);
    if (findUser) {
      res.status(404).send('Wrong Found !');
    }
    const hasedPassword = await bcrypt.hash(password,10);
    collection.insertOne({email:email,password:hasedPassword});
}


async function login(email,password) {
  // Connect
  await client.connect();
  const db = client.db('sardab');
  const collection = db.collection('clients');
  const users = await collection.find().toArray();
  console.log(users);
  // Find User
  return users.find((data) => email == data.email);
}

app.post('/loginProccess',(req,res) => {
    const {email,password} = req.body;
    let findUser = login(email,password);
    if (!findUser) {
      res.status(404).send('Wrong Email Or Password !');
    }
    const passwordMatch = bcrypt.compare(password,findUser.password);
    if (passwordMatch) {
      res.status(200).send('Log In Successfully')
    } else {
      res.status(404).send('Wrong Email Or Password !');
    }
    res.send('Logined :)');
})



app.post('/sign-up', ( req,res ) => {
  try  {
    const {email,password} = req.body;
    register(email,password);
    res.status(201).send('Register Success !');
  } catch (err) {
    res.status(500).send({message:err.message})
  }
})



app.post('/subscribe', (req,res) => {
  res.send('Subscribe Send ');
})