const express=require("express");
const router=new express.Router();
const AddFriendNotification=require('../modles/addfriendNotification');
const auth = require('../middleware/auth');
const User = require("../modles/user");

    router.post("/createFriendNotification/",auth,async (req,res)=>{
    try{
       
        const friendNotification=await AddFriendNotification.find({your_id:req.user._id});
        
        const users=await User.find();
        // const selectedFriendNoti=friendNotification.filter((noti)=>{
        //     return noti.isLooked===false;
        // })
        
        const selectedFriendNoti=friendNotification.map((noti)=>{
            
             const otherUsersWithYourId=users.filter((user)=>{
                 return noti.othersuser_id.toString()===user._id.toString()
             })
           
            const {_id,username,avatar}=otherUsersWithYourId[0];
            let userAvatar =`data:image/png;base64,${avatar.toString('base64')}`;
             return {id:noti._id,username,message:noti.message,isLooked:noti.isLooked,otherUserId:noti.othersuser_id,avatar:userAvatar}
        })
        const ascSelectedFriendNoti=[];
        for(let i=selectedFriendNoti.length-1;i>=0;i--)
        {
            ascSelectedFriendNoti.push(selectedFriendNoti[i])
        }
        if(ascSelectedFriendNoti.length<=0)
        {
            res.json({friedNotificationColl:[null]});
            }
        res.json({friedNotificationColl:ascSelectedFriendNoti})

    }
    catch(e)
    {

    }

})

router.post('/friendrequstNotiCheckStatus',auth,async (req,res)=>{
    let friendNotiCheck=false;
    const friendNotification=await AddFriendNotification.find({your_id:req.user._id});
        
   
    const selectedFriendNoti=friendNotification.filter((noti)=>{
        return noti.isLooked===false;
    })
    if(selectedFriendNoti.length>0)
    {
        friendNotiCheck=true
    }
    res.json({friendNotiCheck:friendNotiCheck})
})
router.post('/makeFriedNotiCheckStatusFalse',auth,async (req,res)=>{
 await AddFriendNotification.updateMany({isLooked:true});
    res.json({success:"success"})
})

module.exports=router;