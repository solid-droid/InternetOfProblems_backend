const table = require('./schema.js');

const searchTLDR = async params=> {
    const user = await getUser(params.email);
    if(user){
        const records = await table.records.find({tldr: {$regex: new RegExp(escapeRegex(params.text), 'i')}});
        return {success: true, data: records};
    } else {
        return {success: false, error: 'user not found, login once'};
    }
    
};

const searchDetails = async params=> {
    const user = await getUser(params.email);
    if(user){
        const details = await table.details.find({desc: {$regex: new RegExp(escapeRegex(params.text), 'i')}});
        return {success: true, data: details};
    } else {
        return {success: false, error: 'user not found, login once'};
    }
};

const getRecordById = async params=> {
    const user = await getUser(params.email);
    if(user){
        const details = await table.details.find({refID: params.refID});
        return {success: true, data: details};
    } else {
        return {success: false, error: 'user not found, login once'};
    }
};

const getUser = async (email) => {
    const user = await table.users.find({email});
    return user[0];
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = {
    searchTLDR,
    searchDetails,
    getRecordById,
};