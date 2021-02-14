const express=require("express");

const Year=require("../modles/year");

const router=new express.Router();

router.post("/year",async (req,res)=>{
    const year=new Year(req.body);
    try{
        await year.save();
        res.status(201).send();
    }
    catch(e)
    {
        res.status(400).send(e);
    }
});


module.exports=router;