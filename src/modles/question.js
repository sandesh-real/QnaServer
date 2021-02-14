const mongoose=require("mongoose");
const validator=require("validator");
const { ObjectID } = require("mongodb");

const questionSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    subject_id:
    {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Subject"
    },
},
{
    timestamps:true
});


const Question=mongoose.model("Question",questionSchema);

module.exports=Question;