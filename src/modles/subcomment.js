const mongoose=require("mongoose");


const subcommentSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    comment_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Comment"
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
},{
    timestamps:true,
});

const SubComment=mongoose.model("SubComment",subcommentSchema);

module.exports=SubComment;