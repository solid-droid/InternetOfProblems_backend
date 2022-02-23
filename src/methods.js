const table = require('./schema.js');

const addRecord = async (params, body) => {
    if(body.tldr &&  body.catagory && body.type ){
        const content = {
            x: body.x,
            z: body.z,
            t: String(new Date()),
            tldr: body.tldr,
            tags: body.tags || [],
            catagory: body.catagory,
            type: body.type,
            author: body.author || null,
            controls: {
                relatedOpen: false,
            },
            related: body.related || [],
            parents: body.parents || [],
        }
        content.tagString = content.tags.map(x => x.name).join(' ');
        let yConfig = (await table.configs.find({type: content.z+"x"+content.x}))[0];
        if(!yConfig){
            await (new table.configs({type:content.z+"x"+content.x, data:{value:0}})).save();
            yConfig = (await table.configs.find({type: content.z+"x"+content.x}))[0];
            content.y = yConfig.data.value;
        } else {
            yConfig.data.value++;
            await table.configs.findOneAndUpdate({type: content.z+"x"+content.x}, yConfig);
            content.y = yConfig.data.value;
        }
        const refID_config = (await table.configs.find({type: "last_refID"}))[0];
        const refID = parseInt(refID_config.data.value);
        content['refID'] = refID+1;
        refID_config.data.value = String(refID+1);
        await (new table.configs(refID_config)).save();
        const record = new table.records(content);
        await record.save();
        await fixY(content.z,content.x);
        return await addDetails({...content, desc: body.description || ''});
    }
    else {
        return {
            success: false, 
            error: 'missing fields'
        };
    }
};

const fixY = async (z,x) => {
        let records = await table.records.find({z,x});
        records = records.map(x=>({y:x.y, p:parseInt(x.parents[0] || '0') , refID: x.refID}))
                         .sort((a,b) => a.p - b.p)
        let y = 0;
        records.forEach(async record => {
            record.y = y++;
            await table.records.findOneAndUpdate({refID: record.refID}, {y : record.y});
            await table.details.findOneAndUpdate({refID: record.refID}, {y : record.y});
        });
        while(y < records.length){
            await new Promise(r => setTimeout(r, 10));
        }
        return {success: true, data: records};
};
const updateRecord = async (body) => {
   let record = await table.records.findOne({refID: body.refID});
   let details = await table.details.findOne({refID: body.refID});
    if(record && details){
      delete body._id;
      if(body.tags){
        body.tagString = body.tags.map(x => x.name).join(' ');
      }
      await table.records.findOneAndUpdate({refID: body.refID}, body);
      const responce = await table.details.findOneAndUpdate({refID: body.refID}, body);
      return {success: true, data: responce};
    }else{
        return {success: false, error: 'record not found'};
    }
};

const updateUser = async (body) => {
    const _id = body._id;
    delete body._id;
    const responce = await table.users.findOneAndUpdate({_id}, body);
    return {success: true, data: responce};
};
const addUser = async (params , body) => {
    let user = await table.users.find({email: body.email});
    if(!user.length){
        await (new table.users(body)).save();
        user = await table.users.find({email: body.email});
    }
    return {success: true, data: user};
};

const addDetails = async (content) => {
    const savedRecord = await (new table.details(content)).save();
    return {success: true, data: savedRecord};
}

const getRecords = async params => {
   const data = await table.records.find();
   return {success: true, data};
};

const getUser = async params => {
    return {success: true, data: {}};
};

const getDetails = async params => {
    const data = await table.details.find({refID: params.refID});
    return {success: true, data};
};

const getSummary = async params => {
    const data = await table.records.find({refID: params.refID});
    if(data.length > 0){
        const {type , catagory , tldr, refID } = data[0];
        return {success: true, data: {valid: true, type , catagory , tldr, refID}};
    }else{
        return {success: true, data:{valid: false}};
    }
};

const getRecordById = async params => {
    const data = await table.records.find({refID: params.refID});
    if(data.length > 0){
        return {success: true, data: data[0]};
    }else{
        return {success: true, data:{valid: false}};
    }
};

const searchRecords = async params => {
    const records = await table.records.find({tldr: {$regex: new RegExp(escapeRegex(params.text), 'i')}});
    return {success: true, data: records};

};

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const searchDetails = async params => {
    const details = await table.details.find({desc: {$regex: new RegExp(escapeRegex(params.text), 'i')}});
    return {success: true, data: details};
};

module.exports = {
    addRecord,
    addDetails,
    addUser,
    getRecords,
    getUser,
    getDetails,
    updateRecord,
    getSummary,
    getRecordById,
    searchRecords,
    searchDetails,
    fixY,
    updateUser
};