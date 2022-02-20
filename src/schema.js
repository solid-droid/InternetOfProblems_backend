const mongoose = require('mongoose')

const iop_records_schema = new mongoose.Schema({
    x:{
        type: Number,
        required: true,
    },
    y:{
        type: Number,
        required: true,
    },
    z:{
        type: Number,
        required: true,
    },
    t:{
        type: String,
        required: true
    },
    tldr : {
        type : String,
        required: true
    },
    tags: {
        type : Array,
        required: false,
        default: []
    },
    tagString: {
        type : String,
        required: false,
        default: ''
    },
    catagory: {
        type : String,
        required: true
    },
    type: {
        type : String,
        required: true
    },
    latest: {
        type : Boolean,
        required: true,
        default: true
    },
    refID: {
        type : String,
        required: false,
        default: null,
        unique: true
    },
    ver: {
        type : String,
        required: false,
        default: '1.0'
    },
    author:{
        type: String,
        required: false,
        default: null
    },
    controls:{
        type: Object,
        required: true
    },
    related : {
        type : Array,
        required: false,
        default: []
    },
    stats:{
        type: Object,
        required: false,
        default:{
            vote: 0,
            location: []
        }
    },
    children: {
        type: Array,
        required: false,
        default: []
    },
    parents:{
        type: Array,
        required: false,
        default: []
    },
    funded: {
        type: Boolean,
        required: false,
        default: false
    },
    verified: {
        type: Boolean,
        required: false,
        default: false
    },
    metadata: {
        type: Object,
        required: false,
        default: {}
    }
});

const iop_configs_schema = new mongoose.Schema({
    type:{
        type: String,
        required: true
    },
    data:{
        type: Object,
        required: true
    }
});
const iop_details_schema = new mongoose.Schema({
    desc: {
        type : String,
        required: false,
        default: ''
    },
    x:{
        type: Number,
        required: true,
    },
    y:{
        type: Number,
        required: true,
    },
    z:{
        type: Number,
        required: true,
    },
    t:{
        type: String,
        required: true
    },
    tldr : {
        type : String,
        required: true
    },
    tags: {
        type : Array,
        required: false,
        default: []
    },
    tagString: {
        type : String,
        required: false,
        default: ''
    },
    catagory: {
        type : String,
        required: true
    },
    type: {
        type : String,
        required: true
    },
    latest: {
        type : Boolean,
        required: true,
        default: true
    },
    refID: {
        type : String,
        required: false,
        default: null,
        unique: true
    },
    ver: {
        type : String,
        required: false,
        default: '1.0'
    },
    author:{
        type: String,
        required: false,
        default: null
    },
    controls:{
        type: Object,
        required: true
    },
    related : {
        type : Array,
        required: false,
        default: []
    },
    stats:{
        type: Object,
        required: false,
        default:{
            vote: 0,
            location: []
        }
    },
    children: {
        type: Array,
        required: false,
        default: []
    },
    parents:{
        type: Array,
        required: false,
        default: []
    },
    funded: {
        type: Boolean,
        required: false,
        default: false
    },
    verified: {
        type: Boolean,
        required: false,
        default: false
    },
    metadata: {
        type: Object,
        required: false,
        default: {}
    }
});

const iop_users_schema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    picture:{
        type: String,
        required: false,
        default: null
    },
    role:{
        type: String,
        required: false,
        default: 'normal'
    },
    location:{
        type: String,
        required: false,
        default: null
     },
    revisions:{
        type: Array,
        required: false,
        default: []
    },
    stats:{
        type: Array,
        required: false,
        default: []
    },
    created:{
        type: Array,
        required: false,
        default:[]
    },
    metadata:{
        type: Object,
        required: false,
        default: {}
    }
});

const iop_versions_schema = new mongoose.Schema({
    refID:{
        type: String,
        required: true
    },
    versions : {
        type: Array,
        required: true
    },
    authors:{
        type: Array,
        required: true
    },
    metadata:{
        type: Object,
        required: true
    }

});

const iop_funding_schema = new mongoose.Schema({
    refID:{
        type: String,
        required: true
    },
    funding : {
        type: Array,
        required: true
    },
    metadata:{
        type: Object,
        required: true
    }
});


module.exports = {
 records   :   mongoose.model('IOP_Records', iop_records_schema),
 configs   :   mongoose.model('IOP_Configs', iop_configs_schema),
 users     :   mongoose.model('IOP_Users', iop_users_schema),
 versions  :   mongoose.model('IOP_Versions', iop_versions_schema),    
 fundings  :   mongoose.model('IOP_Fundings', iop_funding_schema),
 details   :   mongoose.model('IOP_Details', iop_details_schema)
};