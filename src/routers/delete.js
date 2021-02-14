const express=require("express");
const Question=require("../modles/question");
const NotificationData=require("../modles/notificationData");
const auth=require("../middleware/auth");
const Answer = require("../modles/answer");
const Comment=require("../modles/comment");
const SubComment = require("../modles/subcomment");
const Like=require("../modles/likes");
const DisLike = require("../modles/dislikes");
const Subject = require("../modles/subject");
const router=new express.Router();
router.post("/deleteQuestion",auth,async (req,res)=>{
try{

const que=await Question.findOneAndDelete({_id:req.query.id});
await NotificationData.findOneAndDelete({random_id:que._id});
const ansOne=await Answer.find({q_id:que._id});
if(ansOne.length>0){
 
ansOne.forEach(async (item)=>{
    await Like.findOneAndDelete(({answer_id:item._id}));
    await DisLike.findOneAndDelete(({answer_id:item._id}));
  await Answer.findOneAndDelete({_id:item._id});
    
    const comment=await Comment.find({answer_id:item._id});
    if(comment.length>0)
    {
        comment.forEach(async (com)=>{
         
            await Comment.findOneAndDelete({_id:com._id});
        })
    }
});
}
const success={success:'success'}

res.json(success);
}
catch(e)
{

}
});

router.post("/deleteAnswer",async (req,res)=>{
  try{
    
    const ansOne=await Answer.find({_id:req.query.id});

    let {q_id}=ansOne[0];
    
    const notiData=await NotificationData.find({random_id:q_id});
  
      notiData[0].answer_count=0;
      notiData[0].notification_type='';
      notiData[0].save();

      console.log(notiData[0]);
    if(ansOne.length>0){
     
    ansOne.forEach(async (item)=>{
        await Like.findOneAndDelete(({answer_id:item._id}));
        await DisLike.findOneAndDelete(({answer_id:item._id}));
      await Answer.findOneAndDelete({_id:item._id});
        
        const comment=await Comment.find({answer_id:item._id});
        if(comment.length>0)
        {
            comment.forEach(async (com)=>{
             
                await Comment.findOneAndDelete({_id:com._id});
            })
        }
    });
    }
  }
  catch(e)
  {

  }
})


router.get("/deletenotification",async (req,res)=>{
    try{
    await NotificationData.findOneAndDelete({notification_type:req.query.noti});
    res.redirect("back");
    }
    catch(e)
    {
    
    }
    });




module.exports=router;
