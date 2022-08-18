const express = require('express');
const router = express.Router();
const model = require('../models/Employee');

router.get('/', async (req,res) => {
    try{
        const response = await model.find();
        res.status(200).json(response);
        console.log("data showed");
    }
    catch(err){
        res.status(400).json(err);
    }
})

router.get('/:username', async (req,res) => {
    try{

        const temp = req.params.username;
        const response = await model.findOne({'username' : temp});
        res.status(200).json(response);
        console.log(`${username} data is shown`);

    }
    catch(err){
        res.status(400).json(err);
    }
})



router.post('/add_employee' , async (req,res) => {
    try{
        
        const newData = new model({
            username : req.body.username,
            email : req.body.email,
            phone : req.body.phone,
            status : req.body.status,
            gender : req.body.gender,
            profile : req.body.profile,
        });

        const response = await newData.save();
        console.log("data is created", response);
        res.status(201).json(response);

    }
    catch(err){
        res.status(400).json(err);
    }
})

router.put("/update/:username", async (req,res) => {
    try{
        const temp = req.body.username;
        const response = await model.findOneAndUpdate({'username' : temp}, req.body, {new:true});
        res.status(200).json(response);
        console.log("data updated");
    }
    catch(err){
        res.status(400).json(err);
    }
})

router.delete('/:username',async (req,res) => {
    try{
        const temp = req.params.username;
        const response = await model.deleteOne({'username' : temp});
        res.status(200).json(response);
        console.log("data deleted");
    }
    catch(err){
        res.status(400).json(err);
    }
})




module.exports = router;