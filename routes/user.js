const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', async (req, res) => {
    try{
        const get_users = await User.find();
        return res.status(200).json(get_users);
    }catch (err){
        console.error(err);
        return res.status(400).json({Error: "Failed to retrieve all Users"});
    }
})

router.get('/:id', async(req,res) => {
    const id = req.params.id;
    try{
        const found_user = await User.findById(id);

        if(!found_user){
          return res.status(404).json({msg: "The User does not exists!"}); 
        }
        
        return res.status(200).json(found_user);
    } catch (err){
        console.log(err);
        return res.status(500).json("Failed to retrieve the user");
    }
})

router.post('/', async (req,res) => {
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


router.delete('/:id', async(req,res) =>{
    const id = req.params.id;
    try{
        const deleted_user = await User.deleteOne({_id: id});
        if(deleted_user.deletedCount === 0){
            return res.status(404).json({Error: "Invalid ID"});
        }
        return res.status(200).json(`The user has been deleted:`);
    } catch (err) {
      console.log(err);
      return res.status(500).json("Unable to delete the user")
    }
});

module.exports = router;

