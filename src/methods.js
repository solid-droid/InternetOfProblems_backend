const table = require('./schema.js');

const addRecord = async (params, body) => {
    if(body.tldr &&  body.catagory && body.type ){
        const content = {
            x: body.x || null,
            z: body.z || null,
            t: String(new Date()),
            tldr: body.tldr,
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
        const savedDesc = await addDetails(savedRecord.refID , body.desc);
        return {success: true, data: {...savedRecord, ...savedDesc}};
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

const addDetails = async (refID, Details) => {
    return {success: true, data: {}};
}

const getRecords = async params => {
   return {success: true, data: {}};
};

const getUser = async params => {
    return {success: true, data: {}};
};

const getDetails = async params => {
    return {success: true, data: {}};
};

module.exports = {
    addRecord,
    addUser,
    getRecords,
    getUser,
    getDetails,
};