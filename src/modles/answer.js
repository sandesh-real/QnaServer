const mongoose=require("mongoose");
const validator=require("validator");

const answerSchema=new mongoose.Schema({
    answer:{
        type:String,
        required:true,
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    q_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Question'
    }
},{
    timestamps:true
});


const Answer=mongoose.model("Answer",answerSchema);

module.exports=Answer;