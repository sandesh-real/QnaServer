const mongoose=require("mongoose");
const { Timestamp } = require("mongodb");

const facultySchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
       
    },
    sem:{
        type:Boolean,
        required:true,
    },
    year:{
        type:Boolean,
        required:true,
        default:1
    }

},{
timestamps:true
})

const Faculty=mongoose.model('Faculty',facultySchema);
module.exports=Faculty;