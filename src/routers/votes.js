const express =require("express");
const router=new express.Router();
const auth=require('../middleware/auth');
const Question = require("../modles/question");
const Votes=require("../modles/votes");




router.post('/voteChange',auth,async (req,res)=>{

    try{
    const votesQuestion=await Votes.find({question_id:req.body.q_id});
   
    const questionTest=await Question.find({user_id:req.user._id,_id:req.body.q_id})
    let votesChanges=votesQuestion[0].counts;
    let changeQuestion='';
    let userIdCollection='';
    userIdCollection= votesQuestion[0].useCollection.split(',');
    
  
    if(questionTest.length===0)
    {
      
       if(userIdCollection.length>1){

      
        if(req.body.val==='inc' &&  !userIdCollection.includes(req.user._id.toString() + ' inc'))
        {
            
           userIdCollection= userIdCollection.filter((item)=>{
                return item!==req.user._id.toString() + ' dec'
            })
            userIdCollection.push(`${req.user._id.toString()} inc`)
            votesChanges=parseInt(votesQuestion[0].counts)+1
        }
        else if(req.body.val==='dec' &&  !userIdCollection.includes(req.user._id.toString() + ' dec')) {
           
            userIdCollection.push(`${req.user._id.toString()} dec`)
            userIdCollection= userIdCollection.filter((item)=>{
                return item!==req.user._id.toString() + ' inc'
            })
            votesChanges=parseInt(votesQuestion[0].counts)-1
        }
    }
    else{
        if(req.body.val==='inc')
        {
           
            userIdCollection.push(`${req.user._id.toString()} inc`)
            votesChanges=parseInt(votesQuestion[0].counts)+1
        }
        else if(req.body.val==='dec'){
          
            userIdCollection.push(`${req.user._id.toString()} dec`)
        
            votesChanges=parseInt(votesQuestion[0].counts)-1
        }
    }
         await Votes.findOneAndUpdate({question_id:req.body.q_id},{counts:votesChanges});
         changeQuestion= await Votes.findOneAndUpdate({question_id:req.body.q_id},{useCollection:userIdCollection.toString()})

         res.json({votes:votesChanges})

    }
   
  

 
}
catch(e)
{

}
});

router.get("/getVotes",auth,async (req,res)=>{
try{
    
let votes=await Votes.find({question_id:req.query.q_id});

res.json({votes:votes[0].counts,userVote:votes[0].useCollection})
}
catch(e)
{

}
})

module.exports=router;