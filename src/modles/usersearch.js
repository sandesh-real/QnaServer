const mongoose=require("mongoose");

const usersearchSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
       
    },
    search_input:{
        type:String,
        default:'a',
        ref:"Comment"
    },
    
},{
    timestamps:true,
});

const UserSearch=mongoose.model("UserSearch",usersearchSchema);

module.exports=UserSearch;