"use strict";

//app modules
const express = require('express');
const path = require('path');
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
  //add new item to page
  .post("/item/", (req, res, user_id, keywords, description, latitude, longitude) => {
    const newItem = 
    {
      id: items.nextID, //assigns next available int
      user_id: req.body.name,
      keywords: req.body.keywords,
      description: req.body.description,
      image: req.body.image,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      date_from: new Date(),
      date_to: new Date(),
    }
    //checks the newItem is not empty
    if(!newItem.user_id || !newItem.keywords || !newItem.description || !newItem.latitude || !newItem.longitude)
    {
      //if it is empty, break out of execution
      return res.status(400).json({msg : 'Bad Request. Please include: userID, keywords, description, latitude and longitude'});
    }
    //pushes to items list
    items.push(newItem);
    //returns the new complete item list
    res.json(items);
  })
  //gets single item by id
  .get("/item/:itemId", (req, res) => {
    //checks items.js has that particular itemId
    const findItem = items.some(find => find.id === parseInt(req.params.itemId));

    if (findItem) {
      //item found return item in json
      res.json(items.filter(item => item.id === parseInt(req.params.itemId)));
    }
    else {
      //item not found => return error 
      res.status(400).json({ msg: `No item with the id of ${req.params.itemId}` });
      res.send('<h1>ERROR 404</h1>\n<p>Item not found: Maybe the itemId you entered was incorrect.</p>\n<a href="/">Back to homepage</a>');
    }
  })
  //delete single item by id
  .delete("/item/:itemId",(req, res) => {
    const findItem = items.some(item => item.id === parseInt(req.params.itemId));

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

// Docker container exit handler
// https://github.com/nodejs/node/issues/4182
process.on('SIGINT', function() {
  process.exit();
});