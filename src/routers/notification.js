const express=require('express');
const Comment=require("../modles/comment");
const auth=require('../middleware/auth');
const Answer=require("../modles/answer");
const Question=require("../modles/question");
const Notification=require("../modles/notification");
const router=new express.Router();

router.get("/notification/answercount",auth,async (req,res)=>{
        const questionCollectionStatus=[];
    try{
       
        const answerColl=await Answer.find();

        const question=await Question.find();
        const answerCountColl=await Notification.find({user_id:req.user._id});
       
        answerCountColl.forEach(async (item)=>{
           
            const qus=question.filter((qns)=>{
                return qns._id.toString()===item.q_id.toString();
            });
         
            const ansCollector=answerColl.filter((ans)=>{
               return item.q_id.toString()===ans.q_id.toString();
            });
          if(ansCollector.length!==item.answer_count)
          {
           
            item.answer_count=ansCollector.length;
             item.save();
            questionCollectionStatus.push({questionTitle:qus[0].title,anslen:ansCollector.length,status:"true"});

          }
          else{
            questionCollectionStatus.push({questionTitle:qus[0].title,anslen:ansCollector.length,status:"false"});
          }
        });
      res.json(questionCollectionStatus);
       
    }
    catch(e)
    {
        res.status(400).send(e);
    }
})




module.exports=router;