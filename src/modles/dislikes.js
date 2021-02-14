const mongoose=require("mongoose");

const dislikeSchema=new mongoose.Schema({

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

const DisLike=mongoose.model("DisLike",dislikeSchema);

module.exports=DisLike;
