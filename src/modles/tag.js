const mongoose=require("mongoose");

const tagSchema=new mongoose.Schema({
    tagname:{
        type:String,
        required:true,
    }
},
{
    timestamp:true
});

const Tag=mongoose.model('Tag',tagSchema);
module.exports=Tag;