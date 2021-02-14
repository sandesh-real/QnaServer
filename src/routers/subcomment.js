const express=require("express");
const SubComment=require('../modles/subcomment');
const auth=require("../middleware/auth");
const router=new express.Router();

router.post("/subcomment",auth,async (req,res)=>{
    const subcomment=new SubComment({
        ...req.body,
        comment_id:req.query.comment_id,
        user_id:req.user._id
    });
    console.log(subcomment);
    try{
        await subcomment.save();
        res.redirect("back");
    }
    catch(e)
    {
        res.status(400).send();
    }


});

module.exports=router;
