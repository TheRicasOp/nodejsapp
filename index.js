/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const body_parser = require("body-parser");
const cors = require('cors');
const admin = require('firebase-admin');

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
var serviceAccount = require('./infinachat-firebase-adminsdk-n6u87-8365e8e835.json'); 

/**
 *  App Configuration
 */
app.use(cors());	
app.use(body_parser.urlencoded({ extended: false }));	
app.use(body_parser.json());	

admin.initializeApp({	
 credential: admin.credential.cert(serviceAccount)	
});	

const db = admin.firestore();

/**
 * Routes Definitions
 */
//Prueba
app.get("/", (req, res) => {
    res.status(200).send("WHATABYTE: Food For Devs");
  });

//getUsers
app.get('/getUsers',(req,res) => {	
  let data = [];	
db.collection("users").get().	
  then((snapshot) => {	
      snapshot.forEach((doc) => {	
          data.push(doc.data().username);	
      });	

          res.send(data);	
      })	
  .catch((err) => {	
      console.log("Error getting documents", err);	
  });	
});

//addUser
app.post('/addUser',(req,res) => {
    const {usr,passwd} = req.body;
    db.collection("users").add({username: usr,password: passwd});
    res.send({res: 'true'})
    .catch((err) => {
        res.send({res: 'false'});
    });
});

//checa si coincide usr y pass
//login
app.post('/login',(req,res) => {
    const {usr,passwd} = req.body;
    let data = [];
    let band = false;
  db.collection("users").get().
    then((snapshot) => {
        snapshot.forEach((doc) => {
            //data.push(doc.data().username, doc.data().password);
            if (doc.data().username == usr && doc.data().password == passwd) {
            //if (data.username === usr && data.password === passwd) {
              band = true;
            } 
        });
            res.send({res: band});
        })
    .catch((err) => {
        console.log("Error getting documents", err);
    });
  });

//devuelve los chats que tenga el usuario dado
//chats
app.post('/chats',(req,res) => {
  const {usr} = req.body;
  let data = [];
db.collection("chat").get().
  then((snapshot) => {
      snapshot.forEach((doc) => {
          if (doc.data().usuario1 == usr || doc.data().usuario2 == usr) {
            data.push(doc.data());
          }
      });
          res.send(data);
      })
  .catch((err) => {
      console.log("Error getting documents", err);
  });
});

//devuelve todos los mensajes de un chat dado un id_chat
//mensajes
app.post('/msj',(req,res) => {
  const {idchat} = req.body;
  let data = [];
db.collection("mensajes").get().
  then((snapshot) => {
      snapshot.forEach((doc) => {
          if (doc.data().id_chat == idchat) {
            data.push(doc.data());
          }
      });
          res.send(data);
      })
  .catch((err) => {
      console.log("Error getting documents", err);
  });
});

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
