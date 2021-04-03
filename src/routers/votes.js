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
       if(userIdCollection.length>0){

      
        if(req.body.val==='inc' &&  !userIdCollection.includes(req.user._id.toString() + ' inc'))
        {
            console.log("inc 1")
           userIdCollection= userIdCollection.filter((item)=>{
                return item!==req.user._id.toString() + ' dec'
            })
            userIdCollection.push(`${req.user._id.toString()} inc`)
            votesChanges=parseInt(votesQuestion[0].counts)+1
        }
        else if(req.body.val==='dec' &&  !userIdCollection.includes(req.user._id.toString() + ' dec')) {
            console.log("dec 1")
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
            console.log("inc 0")
            userIdCollection.push(`${req.user._id.toString()} inc`)
            votesChanges=parseInt(votesQuestion[0].counts)+1
        }
        else if(req.body.val==='dec'){
            console.log("dec 0")
            userIdCollection.push(`${req.user._id.toString()} dec`)
        
            votesChanges=parseInt(votesQuestion[0].counts)-1
        }
    }
         await Votes.updateOne({counts:votesChanges});
         changeQuestion= await Votes.updateOne({useCollection:userIdCollection.toString()})

         res.json({votes:votesChanges})

    }
   
  

 
}
catch(e)
{
console.log(e);
}
});

router.get("/getVotes",auth,async (req,res)=>{
try{
    
let votes=await Votes.find({question_id:req.query.q_id});
res.json({votes:votes[0].counts})
}
catch(e)
{

}
})

module.exports=router;