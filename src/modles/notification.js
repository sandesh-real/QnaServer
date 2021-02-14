const mongoose=require("mongoose");


const notificationSchema=new mongoose.Schema({
    answer_count:{
        type:Number,
        default:0
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


const Notification=mongoose.model("Notification",notificationSchema);

module.exports=Notification;