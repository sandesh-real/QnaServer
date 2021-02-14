const express =require("express");
const router=new express.Router();
const auth=require('../middleware/auth');
const Like=require("../modles/likes");
const Dislike=require("../modles/dislikes");


router.post("/like",auth,async (req,res)=>{
  
    const likeer=new Like({
        user_id:req.user._id,
        answer_id:req.query.ans_id,
    });
    try{
      
        let dislikeIds=await Dislike.find({answer_id:req.query.ans_id});
       
        if(dislikeIds.length>0){
         dislikeIds=dislikeIds.map((item)=>{
            return item.user_id.toString();    
            });
    }
  
      
      const likeFortest=await Like.findOne({user_id:req.user._id,answer_id:req.query.ans_id});

        if(dislikeIds.length>0){
            
         if(dislikeIds.includes(req.user._id.toString()))
         {
            
           await Dislike.findOneAndDelete({user_id:req.user._id,answer_id:req.query.ans_id});
          }
    }

    if(likeFortest===null)
    {
        await likeer.save();
    }
        
       
      
        res.json({success:"success"});
    }
    catch(e)
    {
        
        res.status(400).send(e);
    }
});


module.exports=router;