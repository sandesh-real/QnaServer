const mongoose=require("mongoose");


const yearSchema=new mongoose.Schema({
    name:{
    type:String,
    required:true,
},
    index:{
        type:Number,
        required:true,
    }
},
{
    timestamps:true,
});
yearSchema.virtual('sem',{
    ref:'Sem',
    localField:"_id",
    foreignField:"year_id"
});



const Year=mongoose.model("Year",yearSchema);

module.exports=Year;