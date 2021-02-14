const express=require("express");
const Sem=require("../modles/sem");
const Year = require("../modles/year");
 
const router=new express.Router();

router.post('/sem',async (req,res)=>{
    
    const year=await Year.findOne({name:req.body.year_name});
    
    const sem=new Sem({
        semname:req.body.name,
        index:req.body.index,
        year_id:year._id

    
    });
   
    try{
       
        await sem.save();
        res.status(201).send(sem);
    }
    catch(e)
    {
        res.status(400).send(e);
    }
})


module.exports=router;