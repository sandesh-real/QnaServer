const mongoose=require("mongoose");

const friendRequestSchema=new mongoose.Schema({

  friend_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
  },
    your_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
   
    }
},{
    timestamps:true
});

const FriendRequest=mongoose.model("FriendRequest",friendRequestSchema);

module.exports=FriendRequest;
