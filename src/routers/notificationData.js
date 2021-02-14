const express=require('express');
const Comment=require("../modles/comment");
const auth=require('../middleware/auth');
const Answer=require("../modles/answer");
const Question=require("../modles/question");
const NotificationData=require("../modles/notificationData");
const router=new express.Router();

router.post('/getRandomNotiColl',auth,async (req,res)=>{
    try{
        const notification=await NotificationData.find({user_id:req.user._id});
        const filterNotification=notification.filter((noti)=>{
            return noti.answer_count>0
        })
        if(filterNotification.length<=0)
        {
            
            res.json({randomNotiColl:[null]})
        }
        res.json({randomNotiColl:filterNotification})
    }
    catch(e)
    {

    }
})


router.post("/notification/statuscheck",auth,async (req,res)=>{
    try{
        
        const notificationdata=await NotificationData.find({user_id:req.user._id});
     
        const status=notificationdata.map((item)=>{
            return item.status
        });
        const modifiedStatus=status.filter((status)=>{
            return status===false
        })
        if(modifiedStatus.length>0)
        {
            res.json({status:false});
        }
        res.json({status:true});
    }
    catch(e)
    {

    }
});
router.post("/notification/statustrue",auth,async (req,res)=>{
    try{
  
        const notificationdata=await NotificationData.find();
  
        notificationdata.forEach((item)=>{
            item.status=true
            item.save();
        });
        
        
    }
    catch(e)
    {
        res.status(400).send(e);
    }
});


module.exports=router;