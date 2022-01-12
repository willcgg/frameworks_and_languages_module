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
    //initialise new item variable
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
    if (!newItem.user_id || !newItem.keywords || !newItem.description || !newItem.latitude || !newItem.longitude) {
      //if it does not hit requirements, break out of execution
      return res.status(405).json({ msg: 'Invalid input' });
    }
    //hits requirements
    //pushes newItem to item list 
    items.push(newItem);
    //returns the new complete item list
    res.status(201).json({ msg: 'Item created successfully', newItem });
  })

  //gets single item by id
  .get("/item/:itemId", (req, res) => {
    //checks items.js contains items
    var hasNoItems = Object.keys(items).length == 0;
    if (hasNoItems) {
      //items.js contains no items => return information to user via json response
      return res.status(200).json({ msg: `Successful Operation. No items found.` });
    }

    //initialising search id
    var searchId = req.params.itemId;
    //gets all item ids into an array
    var itemIds = Object.keys(items);

    if (!itemIds.includes(searchId)) {
      //items does not contain any items with that search id
      res.status(404).json({ msg: 'Item not found' });
    }
    else if (itemIds.includes(searchId)) {
      //items contains item with itemId, return in json response
      var item = items[searchId];
      res.status(200).json({ item, msg: 'successful operation' });
    }
    else {
      res.status(400).json({ msg: 'Invalid itemId' })
    }
  })

  //delete single item by id
  .delete("/item/:itemId", (req, res) => {
    //checks items.js contains items
    var hasNoItems = Object.keys(items).length == 0;
    if (hasNoItems) {
      //has no items
      return res.status(200).json({ msg: `No items found` });
    }

    //check items contains the itemID
    const searchID = req.params.itemId;
    const itemIds = Object.keys(items);

    if (!itemIds.includes(searchID)) {
      //doesnt find the item
      res.status(400).json({ msg: 'Invalid itemID' });
    }
    else if (itemIds.includes(searchID)) {
      //finds item
      delete items[searchID];
      return res.status(200).json({ items });
    }
  })

//gets items based on search 
app
  .get('/items/', (req, res) => {
    res.status(200).json(items);
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
process.on('SIGINT', function () {
  process.exit();
});