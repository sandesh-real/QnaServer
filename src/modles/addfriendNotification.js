const mongoose=require("mongoose");


const addFriendnotificationSchema=new mongoose.Schema({
   othersuser_id:{
    type:mongoose.Schema.Types.ObjectId,
        
    },
    your_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
       
    },
    isLooked:{
        type:Boolean,
        default:false
    },
    message:{
        type:String,
        default:null
    }
},{
    timestamps:true
});


const AddFriendNotification=mongoose.model("AddFriendNotification",addFriendnotificationSchema);

module.exports=AddFriendNotification;