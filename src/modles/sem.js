const mongoose=require("mongoose");

const semSchema=new mongoose.Schema({
    semname:{
        type:String,
        required:true,
    },
    index:{
        type:Number,
        required:true,
    },
    year_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Year"
    }
},
{
    timestamps:true
});

const Sem=mongoose.model("Sem",semSchema);
module.exports=Sem;