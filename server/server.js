"use strict";

//app modules
const express = require('express');
const { hostname } = require('os');
const path = require('path');
const { time } = require('console');
const items = require('./items');

//constants
const port = 8000;
const app = express();

//middleware
//logs any requests to the console along with the ip address it was from and time it was made
const logger = (req, res, next) => {
  var date = new Date();
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}` + "\nRequest made by: " +
    req.headers['x-forwarded-for'] + "\nAt: " + date);
  next();
}

//initializing middleware
app.use(logger);

//making 'public' a static folder
app.use(express.static(path.join(__dirname, 'public')));

//Item routes: handles every endpoint with /items/
//ROUTES

app
  //gets all items
  .get((req, res) => {
    res.json(items);
  })
app
  //add new item to page
  .post('/item/', (req, res, user_id, keywords, description, latitude, longitude) => {
    if (user_id == "" || keywords == "" || description == "" | latitude == 0 || longitude == 0) {
      res.status(405).json({ msg: `No item with the id of ${req.params.itemId}` });
      res.Send("<h1>ERROR 405</h1><p>Invalid Input: Maybe you missed a field</p>\n<p><a href=" / ">Back to homepage</a></p>");
      return;
    }
  })
  //gets single item by id
  .get("/item/:itemId", (req, res) => {
    //checks items.js has that particular itemId
    const findItem = items.some(member => member.id === parseInt(req.params.itemId));

    if (findItem) {
      //item found
      res.json(items.filter(item => item.id === parseInt(req.params.itemId)));
    }
    else {
      //item not found => return error 
      res.status(400).json({ msg: `No item with the id of ${req.params.itemId}` });
      res.send('<h1>ERROR 404</h1>\n<p>Item not found: Maybe the itemId you entered was incorrect.</p>\n<a href="/">Back to homepage</a>');
    }
  })
  //delete single item by id
  .delete((req, res) => {

  })

  //gets items based on search 
  app
  .get('/items/', (req, res) =>
  {
    
  })

app.listen(port, (err) => {
  //error handling
  if (err) {
    console.log("There was a problem with the server: ", err);
    return;
  }
  //no errors app listening
  console.log(`Example app listening at port 8000...`)
})