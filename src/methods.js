const table = require('./schema.js');

const addRecord = async (params, body) => {
    if(body.tldr &&  body.catagory && body.type ){
        const content = {
            x: body.x || null,
            y: body.y || null,
            z: body.z || null,
            t: String(new Date()),
            tldr: body.tldr,
            desc: body.desc || '',
            tags: body.tags || [],
            catagory: body.catagory,
            type: body.type,
            refID: body.refID || null,
            author: body.author || null,
            controls: body.controls || {},
            related: body.related || [],
        }
        const record = new table.records(content);
        const savedRecord = await record.save();
        console.log(savedRecord);
        return {success: true, data: {}};
    }
    else {
        return {
            success: false, 
            error: 'missing fields'
        };
    }
};

const addUser = async (params , body) => {
    return {success: true, data: {}};
};

const getRecords = async params => {
   return {success: true, data: {}};
};

const getUser = async params => {
    return {success: true, data: {}};
};


module.exports = {
    addRecord,
    addUser,
    getRecords,
    getUser,
};