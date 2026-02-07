require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const MONGOURI = process.env.MONGOURI;
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());

const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    age: {
      type: Number
    }
})

const User = mongoose.model("JamesDB", userSchema);

mongoose.connect(MONGOURI)
  .then(() => console.log("MONGODB successfully connected!"))
  .catch((err) => console.error("Error connection to the Database."));


app.get('/', (req,res) => {
    res.status(200).json("Thanks for visiting the Homepage!");
});


app.get('/api/users/:id', async(req,res) => {
    const id = req.params.id;
    try{
        const found_user = await User.findById(id);

        if(!found_user){
          return res.status(200).json({msg: "The User doesnt not exists!"}); 
        }
        
        return res.status(200).json(found_user);
    } catch (err){
        console.log(err);
        return res.status(500).json("Failed to retrieve the user");
    }
})

app.post('/api/users', async (req,res) => {
  if(!req.body || !req.body.first_name || !req.body.last_name || !req.body.email || !req.body.age){
    return res.status(404).json({err: "All fields are required"});
  }
    try{
        const result = await User.create({
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            age: req.body.age
        })
        res.status(201).json(result);
    } catch(err) {
      console.log(err);
      res.status(500).json({Error: "Failed to create a user"});
    }
})

app.listen(PORT, () => {
    console.log(`The application is running at http://localhost:${PORT}/`);
});

