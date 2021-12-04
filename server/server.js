"use strict";

//constants
const port = 8000;
const host = '0.0.0.0';

//app
const express = require('express')
const path = require('path')

const app = express()

//requests
//home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
  })
  .post('/', (req, res) => {
    
  })
  .put('/', (req, res) => {

  })
  .delete('/', (req, res) => {

  })

//about page
app.get('/about', (req, res) => {
    res.send('<h1>ABOUT</h1>');
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