const mongoose=require("mongoose");
const subjectSchema=new mongoose.Schema({
    subjectname:{
        type:String,
        required:true,
    },
    sem_name:{
        type:String,
        
        
    },
    
    year_name:{

        type:String,
        required:true,
      
    },
    faculty_name:{
        type:String,
        required:true,
        
    }

},{
    timestamps:true
});

const Subject=mongoose.model("Subject",subjectSchema);
module.exports=Subject;