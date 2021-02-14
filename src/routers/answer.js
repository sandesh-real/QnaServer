const express=require("express");
const Answer=require("../modles/answer");
const auth=require("../middleware/auth");
const Question = require("../modles/question");
const Comment=require("../modles/comment");
const NotificationData=require("../modles/notificationData");
const Like=require("../modles/likes");
const DisLike=require("../modles/dislikes");
const router=new express.Router();
router.post("/create",auth,async (req,res)=>{
  
    const answer=new Answer({
        ...req.body,
        user_id:req.user._id,
        q_id:req.query.q_id
    });
  
 

    
    try{
        await answer.save();
        
     
        const notification=await NotificationData.find();
       const questionColl=await Question.find();
        const answerColl=await Answer.find();
        
   //**************notification  */
        notification.forEach((item)=>{
            var ansColl=answerColl.filter((ans)=>{
                return ans.q_id.toString()===item.random_id.toString();
                
            });
           
            const que=questionColl.filter((qs)=>{
                return qs._id.toString()===req.query.q_id.toString();
            });
           
            
            if(ansColl.length>item.answer_count)
            {
                item.status=false;
                item.answer_count=ansColl.length;
                item.notification_type=`Your Posted Question "${que[0].title}" has
                been answered by ${ansColl.length} people`;
                item.question_id=req.query.id;
                item.save();
            }
   
        });
        
       
        res.json({success:"success"});
       
    }
    catch(e)
    {
        res.status(400).send(e);
    }
});




module.exports=router;
