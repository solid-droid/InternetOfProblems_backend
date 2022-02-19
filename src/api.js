const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const methods = require('./methods.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
process.env.CONTEXT = 'production';
const port = process.env.PORT || 9000;

app.get('/', async (req,res)=>{
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

app.get('/connect', async (req,res)=>  await initFunction(res));

app.post('/addRecord', async (req,res)=>{
    try{
        const result = await methods.addRecord(req.params, req.body);
        res.status(200).json(result);
    }
    catch(err){
        res.status(409).json({success: false, data: {}, error: err})
        console.log(err)
    }

});

app.post('/addUser', async (req,res)=>{
    try{
        const result = await methods.addUser(req.params, req.body);
        res.status(200).json(result);
    }
    catch(err){
        res.status(409).json({success: false, data: {}, error: err})
        console.log(err)
    }

});

app.post('/updateRecord', async (req,res)=>{
    try{
        const result = await methods.updateRecord(req.body);
        res.status(200).json(result);
    }catch(err){
        res.status(409).json({success: false, data: {}, error: err})
        console.log(err)
    }
});

app.get('/getRecords', async (req,res)=> {
    try{
        const result = await methods.getRecords(req.params);
        res.status(200).json(result);
    }
    catch(err){
        res.status(409).json({success: false, data: {}, error: err})
        console.log(err)
    }

});

app.get('/getSummary/:refID', async (req,res)=> {
    try{
        const result = await methods.getSummary(req.params);
        res.status(200).json(result);
    }
    catch(err){
        res.status(409).json({success: false, data: {}, error: err})
        console.log(err)
    }

});

app.get('/getRecordById/:refID', async (req,res)=> {
    try{
        const result = await methods.getRecordById(req.params);
        res.status(200).json(result);
    }
    catch(err){
        res.status(409).json({success: false, data: {}, error: err})
        console.log(err)
    }

});

app.get('/getDetails/:refID', async (req,res)=> {
    try{
        const result = await methods.getDetails(req.params);
        res.status(200).json(result);
    }
    catch(err){
        res.status(409).json({success: false, data: {}, error: err})
        console.log(err)
    }
});

app.get('/getUser', async (req,res)=> {
    try{
        const result = await methods.getUser(req.params);
        res.status(200).json(result);
    }
    catch(err){
        res.status(409).json({success: false, data: {}, error: err})
        console.log(err)
    }

});

app.get('/fixY/:x', async (req,res)=> {
    try{
        const result = await methods.fixY(req.params.x);
        res.status(200).json(result);
    }
    catch(err){
        res.status(409).json({success: false, data: {}, error: err})
        console.log(err)
    }

});


app.get('/searchRecords/:text', async (req,res)=> {
    try{
        const result = await methods.searchRecords(req.params);
        res.status(200).json(result);
    }
    catch(err){
        res.status(409).json({success: false, data: {}, error: err})
        console.log(err)
    }
});

app.get('/searchDetails/:text', async (req,res)=> {
    try{
        const result = await methods.searchDetails(req.params);
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

app.listen(port, () => {
    initFunction();
    console.log(`Example app listening on port ${port}`);
})