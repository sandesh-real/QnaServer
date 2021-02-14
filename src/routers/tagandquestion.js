const express=require('express');
const TagAndQuestion=require("../modles/tagandquestion");
const router=new express.Router();

router.post("/tag",async (req,res)=>{
    const tagandquestion=new TagAndQuestion(req.body);
    try{

    }
    catch(e)
    {
        await tagandquestion.save();
    }
})

module.exports=router;