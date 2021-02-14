const express=require('express');
const Tag=require("../modles/tag");
const router=new express.Router();

router.post("/tag",async (req,res)=>{
    const tag=new Tag(req.body);
    try{

    }
    catch(e)
    {
        await tag.save();
    }
})

module.exports=router;