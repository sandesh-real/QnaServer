const express =require("express");
const router=new express.Router();
const auth=require('../middleware/auth');
const DisLike=require("../modles/dislikes");
const Like=require("../modles/likes");



router.post("/dislike",auth,async (req,res)=>{
  
    const dislikeer=new DisLike({
        user_id:req.user._id,
        answer_id:req.query.ans_id,
    });
    try{
        
        let likeIds=await Like.find({answer_id:req.query.ans_id});
        const likeFortest=await DisLike.findOne({user_id:req.user._id,answer_id:req.query.ans_id});
       
        if(likeIds.length>0){
           
            likeIds=likeIds.map((item)=>{
                
               return item.user_id.toString();
           });
        }
       
        
        if(likeIds.length>0){
       
            if(likeIds.includes(req.user._id.toString()))
            {
            
               
            await Like.findOneAndDelete({user_id:req.user._id,answer_id:req.query.ans_id});
          }
    }
   
    if(likeFortest===null)
    {
        await dislikeer.save();
    }
        
   
    
    res.json({success:"success"});
    }
    catch(e)
    {
        
        res.status(400).send(e);
    }
});

module.exports=router;