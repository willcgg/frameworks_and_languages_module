"use strict";

//app modules
const express = require('express');
const { hostname } = require('os');
const path = require('path');
const items = require('./items');
const { time } = require('console');

//constants
const port = 8000;
const app = express();

//middleware
//logs any requests to the console along with the ip address it was from and time it was made
const logger = (req, res, next) => {
  var date = new Date();
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}` + " request made by: " + 
  req.headers['x-forwarded-for'] + " at: " + date);
  next();
}

//initializing middleware
app.use(logger);

//making 'public' a static folder
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
//add new item to page
app.post('/items/', (req, res, user_id, keywords, description, latitude, longitude) => {
  //checks request isn't empty
    if(user_id == "" || keywords == "" || description == ""| latitude == 0 || longitude == 0)
    {
      res.Send("<h1>ERROR 405 \n Invalid Input</h1>"); 
      return;
    }
    
  })//gets items from search
  .get('/items/', (req, res) => {

  })

//getting item by id
app.get('/items/{itemId}', (req, res) => {
    
})
//delete item by id
.delete('/items/{itemId}', (req, res) => {

})

app.listen(port, (err) => {
      //error handling
    if(err)
    {
        console.log("There was a problem with the server: ", err);
        return;
    }
    //no errors app listening
    console.log(`Example app listening at port 8000...`)
  })