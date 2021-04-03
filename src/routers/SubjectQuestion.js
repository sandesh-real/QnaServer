const express=require("express");
const Question = require("../modles/question");
const Sem=require("../modles/sem");
const Year = require("../modles/year");
const Answer =require("../modles/answer");
 
const router=new express.Router();

router.post('/subjectQuestion',async (req,res)=>{
    let isAnswer=false;
    try{
       
     const SubQuestion=await Question.find({subject_id:req.query.id});
    
     const Answers =await Answer.find();


    
          const modifiedQuestion=  SubQuestion.map((question)=>{
                const {_id,title,user_id,subject_id,annonymity}=question;
                const AnswerForSubject=Answers.filter((answer)=>{
                    return answer. q_id.toString()===question._id.toString();
                })
                if(AnswerForSubject.length>0)
                {
                    isAnswer=true
                }
                return {_id,title,user_id,isAnswer,annonymity,answrCount:AnswerForSubject.length};

            })
          
            res.json({
                questionColl:modifiedQuestion
            })
        
    }
    catch(e)
    {
        res.status(400).send(e);
    }
})


module.exports=router;