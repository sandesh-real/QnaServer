const mongoose=require("mongoose");

const likeSchema=new mongoose.Schema({

  user_id:{
    type:mongoose.Schema.Types.ObjectId,
   
  },
    answer_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Answer"
    }
},{
    timestamps:true
});

const Like=mongoose.model("Like",likeSchema);

module.exports=Like;
