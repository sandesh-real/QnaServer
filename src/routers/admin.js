const express=require("express");
const Faculty=require("../modles/faculty");
const Subject=require("../modles/subject");
const Sem=require("../modles/sem");
const Years=require("../modles/year");
const Year = require("../modles/year");
const router=new express.Router();

router.get("/admin",async (req,res)=>{
    const faculty=await Faculty.find();
    const sems=await Sem.find();
    const years=await Years.find();
   
    res.json({
        faculty,sems,years
    })
})


module.exports=router;



router.get("/admin/addSubject",async (req,res)=>{
    try{
        const faculty=await Faculty.find();
        const sems=await Sem.find();
        const years=await Years.find();
        res.render("admin-panel/addsubject/index",{
            faculty,
            years,
            sems
        });
    }
    catch(e)
    {

    }
   
})


//add faculty
router.post("/addfaculty",async (req,res)=>{
    
    const newObj={name:req.body.name,sem:parseInt(req.body.sem)};
    const faculty=new Faculty(newObj);
    try{
        await faculty.save();
   
    }
    catch(e)
    {
        res.status(400).send();
    }
});


//add subject
router.post("/addsubject",async (req,res)=>{
   
    const subject=new Subject(req.body);
   
    try{
        await subject.save();
        
    }
    catch(e)
    {
        res.status(400).send();
    }
})