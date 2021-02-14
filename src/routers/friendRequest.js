const express =require("express");
const FriendRequest = require("../modles/friendRequest");
const auth=require('../middleware/auth');
const AddFriendRequestNotificatin=require('../modles/addfriendNotification');
const User = require("../modles/user");
const router=new express.Router();

router.post('/friendRequest',auth,async (req,res)=>{

    const friendRequest=new FriendRequest({
        friend_id:req.query.f_id,
        your_id:req.user._id
    })
    const newFriendRequestNoti=new AddFriendRequestNotificatin({
        othersuser_id:req.user._id,
        your_id:req.query.f_id
    }
    )
    try{
        
        const friendReq=await FriendRequest.findOne({friend_id:req.query.f_id,your_id:req.user._id});
        
        
          
        
            const message=`started following you`;

        if(friendReq)
        {
            await FriendRequest.findOneAndDelete({friend_id:req.query.f_id,your_id:req.user._id});
                await AddFriendRequestNotificatin.findOneAndDelete({  othersuser_id:req.user._id,your_id:req.query.f_id});

            res.json({message:"you successfully unfollowed"})
        }
       
        else if((req.query.f_id.toString()===req.user._id.toString()))
        {
            res.json({message:"fail"})
        }
        else{
           
            friendRequest.save();
            newFriendRequestNoti['message']=message;
            newFriendRequestNoti.save()
            res.json({message:"you successfully followed"})
        }
    }
    catch(e)
    {

    }

})

router.post('/friendRequest/checkstatus',auth,async (req,res)=>{
    let isAlreadyFriend='';
    try{
      
        const friendrequest=await FriendRequest.find({friend_id:req.query.id,your_id:req.user._id})
      
        if(friendrequest.length>0)
        {
            isAlreadyFriend=true
        }
        else{
            isAlreadyFriend=false
        }
      
        res.json({isAlreadyFriend})
    }

    catch(e)
    {

    }

})



module.exports=router;