require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const MONGOURI = process.env.MONGOURI;
const PORT = process.env.PORT || 8000;
const app = express();

mongoose.connect(MONGOURI)
  .then(() => console.log("MONGODB successfully connected!"))
  .catch((err) => console.error("Error connection to the Database."));


app.get('/', (req,res) => {
    res.status(200).json("Thanks for visiting the Homepage!");
});



app.listen(PORT, () => {
    console.log(`The application is running at http://localhost:${PORT}/`);
});

