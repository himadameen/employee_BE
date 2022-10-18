const express = require('express');
const router = express.Router();
const model = require('../models/NewUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.get('/newUser', async(req,res) =>{
    try{
        const response = await model.find();
        res.status(200).json(response);
        console.log("user data is showed");
    }
    catch(err){
        res.status(400).json(err)
    }
})

router.get('/:_id', async (req,res) => {
    try{
        const temp = req.params._id;
        const response = await model.findOne({'_id' : temp});
        res.status(200).json(response);
        console.log(response);
    }
    catch(err){
        res.status(400).json(err);
    }
})




router.post('/newUser', async(req,res) => {
    try{
        const new_data = new model ({
            fullName : req.body.fullName,
            email : req.body.email,
            mobile : req.body.mobile,
            address : req.body.address,
            password : req.body.password,
            re_password : req.body.re_password,
        });
        const userExists  = await model.findOne({ email : new_data.email});
        if(userExists){
            return res.status(422).json({error : "Email already exist"});
        }else if(new_data.password !== new_data.re_password){
            return res.status(422).json({error : "password does not match"});
        }else{
            const response = await new_data.save();
            console.log("new user is created"  + response);
            res.status(201).json(response);    
        }   
    }
    catch(err){
        res.status(400).json(err);
        console.log(err);
    }
})

router.put('/:_id', async(req,res) => {
    try{
        const temp = req.params._id;
        const response = await model.findOneAndUpdate({'_id' : temp}, req.body, {new:true});
        res.status(200).json(response);
        console.log("data updated");
    }
    catch(err){
        res.status(400).json(err);
    }
})


router.delete('/:fullName',async (req,res) => {
    try{
        const temp = req.params.fullName;
        const response = await model.deleteOne({'fullName' : temp});
        res.status(200).json(response);
        console.log("deleted");
    }
    catch(err){
        res.status(400).json(err);
    }
})

router.post('/signin', async(req,res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password) {
            // windows.alert("Invalid Credentials");
            return res.status(400).json({error : 'Please fill the data'});
        }
        const user  = await model.findOne({email : email});
        console.log(user);
        if(user){
            const match = await bcrypt.compare(password, user.password);
            const token = await user.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires : new Date(Date.now() + 25892000000),
                httpOnly : true 
            });
            
            if(!match){
                return res.status(404).json({ error :  "Invalid email or password"});
            }else{
                return res.status(201).json({ message : "Sucessful"});
            }
        }else{
            return res.status(400).json({error : "Invalid Credentials"});
        }
    }
    catch(err){
        res.status(400).json(err);
    }
})


module.exports = router;