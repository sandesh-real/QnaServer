const mongoose=require("mongoose");

const VoteSchema=new mongoose.Schema({

  user_id:{
    type:mongoose.Schema.Types.ObjectId,
   
  },
    question_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
       
    },
    counts:{
      type:Number,
      default:0,
    },
    useCollection:{
type:String,
default:'',
    }
},{
    timestamps:true
});

const Votes=mongoose.model("Votes",VoteSchema);

module.exports=Votes;
