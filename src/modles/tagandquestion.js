const mongoose=require("mongoose");

const tagandquestionSchema=new mongoose.Schema({
    tag_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Tag"
    },
    q_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Question"
    }
},{
    timestamps:true,
});

const TagAndQuestion=mongoose.model("TagAndQuestion",tagandquestionSchema);
module.exports=TagAndQuestion;