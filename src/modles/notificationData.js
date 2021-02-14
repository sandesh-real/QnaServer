const mongoose=require("mongoose");


const notificaitondataSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    notification_type:{
        type:String,
    },
    question_id:{
        type:mongoose.Schema.Types.ObjectId,
        
    },
   status:{
    type:Boolean,
    default:true
   },
   answer_count:{
    type:Number,
    default:0
   },
    random_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }
},{
    timestamps:true
});


const NotificationData=mongoose.model("NotificationData",notificaitondataSchema);

module.exports=NotificationData;