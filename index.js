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

const cheerio = require('cheerio');
const fs = require('fs');

// TEST
app.get('/control-admin',(req,res) => {
  
  let htmlCode = cheerio.load(
    `
        <link rel="stylesheet" href="../../main.css">
        <ul class="admin-page">
          <li>
            <a href="#" class="admin-page" data-path="index.html" data-file="home"> الرئيسية</a>
          </li>
          <li>
            <a href="#" class="admin-page" data-path="price/index.html" data-file="price">اسعارنا</a>
          </li>
          <li>
            <a href="#" class="admin-page" data-path="privacy_policy/privacy_policy.html" data-file="privacy_policy">سياسات</a>
          </li>
        </ul>
        <form class="editForm" action="/editContent" method="POST">
        <input hidden name="filePath" value="" />
        <div class="holder"></div>
        <button>تحديث</buton>

        <script src="../../admin.js"></script>
        </form>
      `)


      // Create Forms For Files
      
      // Home Page
      const homePage = createInputsFrom('index.html','home');
      htmlCode('form div').append(homePage);
      // price Page
      const pricePage = createInputsFrom('price/index.html','price');
      htmlCode('form div').append(pricePage);
      // Home Page
      const privacy_policy = createInputsFrom('privacy_policy/privacy_policy.html','privacy_policy');
      htmlCode('form div').append(privacy_policy);


        function createInputsFrom(file,className) {
          const $ = cheerio.load(fs.readFileSync('./dist/' + file ,'utf-8'))
          let code = cheerio.load(`<div class="${className} divInput non-active"></div>`);
          // LOOP
          $('body *:not(div,section,ul,i,img,footer,header,li,select)').each((i,el) => {
            const e = $(el);
            if (e.text().trim().length > 0) {
              code('div').append(`<input class="editInput" name="${file}-${i}" data-number="${i}" value="${e.text().trim()}" />`)
            }
          });
          return code.html();
        }




  res.send(htmlCode.html());
})

app.post('/editContent',(req,res) => {
  
  const data = req.body;
  const $ = cheerio.load(fs.readFileSync('./dist/' + data.filePath ,'utf-8'));


  $('body *:not(div,section,ul,i,img,footer,header,li,select)').each((i,el) => {
    
    $(el).text(data[`${data.filePath}-${i}`]);
  })

  // Write On The File
  fs.writeFileSync('./dist/' + data.filePath ,$.html(),'utf-8')

  res.redirect(data.filePath);
})



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});