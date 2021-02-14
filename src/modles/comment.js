const mongoose=require("mongoose")

const commentSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    answer_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Answer"
    } 

},
{
    timestamps:true,
});

const Comment=mongoose.model("Comment",commentSchema);

module.exports=Comment;