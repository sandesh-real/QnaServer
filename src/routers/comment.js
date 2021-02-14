const express=require('express');
const Comment=require("../modles/comment");
const auth=require('../middleware/auth');
const Answer=require("../modles/answer");
const Question=require("../modles/question");
const User = require('../modles/user');
const Like=require('../modles/likes');
const DisLike = require('../modles/dislikes');


const router=new express.Router();

router.post('/comment',auth,async (req,res)=>{
    const comment=new Comment({
        ...req.body,
        user_id:req.user._id,
        answer_id:req.query.answer_id
    });
  
   
    try{
        await comment.save();
 
            res.json({success:"success"});
     
        
    }
    catch(e)
    {
        res.status(400).send();
    }

}) 



router.post("/getComment",auth,async (req,res)=>{
    try{
        
        const comments= await Comment.find({answer_id:req.query.id});
      
        const users=await User.find();
        const likes=await Like.find();
       
        const dislikes=await DisLike.find();
    
       
        let modifiedComment=comments.map((comment)=>{
            let isLikeBol=false;
            let isDisLikeBol=false
            const {_id,title,user_id,answer_id,createdAt}=comment;
            const LikeCount=likes.filter((like)=>{
                return _id.toString()===like.answer_id.toString();
            })
            
            const DisLikeCount=dislikes.filter((dislike)=>{
                return dislike.answer_id.toString()===_id.toString()
            })
            const isLike=LikeCount.filter((item)=>{
                return item.user_id.toString()===req.user._id.toString();
            })
            const isDisLike=DisLikeCount.filter((item)=>{
             return item.user_id.toString()===req.user._id.toString();
         })
             if(isLike.length>0)
             {
                 isLikeBol=true;
                 isDisLikeBol=false;
             }
             if(isDisLike.length>0)
             {
                 isDisLikeBol=true;
                 isLikeBol=false;
             }
              


            const userForAvatar=users.filter((user)=>{
                return user_id.toString()===user._id.toString();
            });

            const userAvatar=`data:image/png;base64,${userForAvatar[0].avatar.toString('base64')}`;
            return {_id,title,createdAt,username:userForAvatar[0].username,LikeCount:LikeCount.length,DisLikeCount:DisLikeCount.length,isLikeBol,isDisLikeBol,userAvatar:userAvatar,commentUserId:user_id}
        })
      
        res.json({commentColl:modifiedComment})
    }
    catch(e){

    }
})




module.exports=router;