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

//Item routes: handles every endpoint with /items/
//ROUTES

app
  //add new item to page
  .post("/item/", (req, res) => {
    var newItem = 
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
    //checks the newItem has required fields
    if(!newItem.user_id || !newItem.keywords || !newItem.description || !newItem.latitude || !newItem.longitude)
    {
      //if it does not hit requirements, break out of execution
      return res.status(400).json({msg : 'Bad Request. Please include: userID, keywords, description, latitude and longitude'});
    }
    //hits requirements
    //pushes newItem to item list 
    items.push(newItem);
    //returns the new complete item list
    res.json(items);
  })

  //gets single item by id
  .get("/item/:itemId", (req, res) => {
    //checks items.js contains items
    var hasNoItems = Object.keys(items).length == 0;
    if (hasNoItems) {
      //items.js contains no items => return information to user via html page and json response
      res.send('<h1>ERROR 200</h1>\n<p>Item not found: There are currently no Items.</p>\n<a href="/">Back to homepage</a>');
      return res.status(200).json({ msg: `No items found`});
    }
    // items.js contains items, now search for given id
    var searchId = parseInt(req.params.itemId);
    if(items.hasOwnProperty(searchId)){
      //items contains item with itemId, return in json response
      var item = items[searchId];
      res.json(item);
    }
  })

  //delete single item by id
  .delete("/item/:itemId",(req, res) => {
    //checks items.js contains items
    var hasNoItems = Object.keys(items).length == 0;
    if(hasNoItems){
      //has no items
      res.send('<h1>ERROR 200</h1>\n<p>Item not found: There are currently no Items.</p>\n<a href="/">Back to homepage</a>');
      return res.status(200).json({ msg: `No items found`});
    }

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