const express=require("express");
const Question=require("../modles/question");
const auth=require("../middleware/auth");
const Subject=require("../modles/subject");
const NotificationData=require("../modles/notificationData");
const Votes =require("../modles/votes");
const router=new express.Router();




router.post('/question/create',auth,async (req,res)=>{
    
    const subject=await Subject.findOne({subjectname:req.body.subjectname});
   
    const question=new Question({
        title:req.body.title,
        user_id:req.user._id,
        subject_id:subject._id,
        annonymity:req.body.annonymity
    }
        );
    
        const notificationdata=new NotificationData({
            random_id:question._id,
            user_id:req.user._id
        })
        const voter=new Votes({
            user_id:req.user._id,
            question_id:question._id,
        });
    try{
       await question.save();
       await notificationdata.save();
       await voter.save();

       res.json({success:"success"});
        // res.status(201).render("sub-main/index",{
       
        //     questions:questionArr,
        //     token:`?Authorization=Bearer ${req.token}`,
            

            
        // });
    }
    catch(e)
    {
       res.status(400).send(e); 
    }
});



module.exports=router;