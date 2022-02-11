const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const methods = require('./methods.js');

const app = express();
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
process.env.CONTEXT = 'production';

router.get('/', async (req,res)=>{
    try{
       res.status(200).json({
           'hello': 'there',
           'this is': 'Internet of Problems',
           'Back': 'End',
           success: false, data: {}
    })
    } catch(err)
    {
        res.status(409).json({success: false, data: {}, error: err})
        console.log(err)
    }
});

router.get('/connect', async (req,res)=>  await initFunction(res));

router.post('/addRecord', async (req,res)=>{
    try{
        const result = await methods.addRecord(req.params, req.body);
        res.status(200).json(result);
    }
    catch(err){
        res.status(409).json({success: false, data: {}, error: err})
        console.log(err)
    }

});

router.post('/addUser', async (req,res)=>{
    try{
        const result = await methods.addUser(req.params, req.body);
        res.status(200).json(result);
    }
    catch(err){
        res.status(409).json({success: false, data: {}, error: err})
        console.log(err)
    }

});

router.get('/getRecords/:x?/:y?/:z?', async (req,res)=> {
    try{
        const result = await methods.getRecords(req.params);
        res.status(200).json(result);
    }
    catch(err){
        res.status(409).json({success: false, data: {}, error: err})
        console.log(err)
    }

});

router.get('/getUser', async (req,res)=> {
    try{
        const result = await methods.getUser(req.params);
        res.status(200).json(result);
    }
    catch(err){
        res.status(409).json({success: false, data: {}, error: err})
        console.log(err)
    }

});


async function initFunction(res = null) {
    console.log('Connecting to Database');
    mongoose.connect( process.env.MONGO_URI,() => {
        console.log('connected to mongoDB');
        if(res){
            res.status(200).json({success: true, data: {}});
        }
    });
}

initFunction();
app.use('/.netlify/functions/api',router);
module.exports.handler = serverless(app);