
const express=require("express");
const router=new express.Router();
const auth=require('../middleware/auth');
const fuzz = require('fuzzball');
const Question=require("../modles/question");
const { text } = require("express");
const UserSearch = require("../modles/usersearch");
const User = require("../modles/user");
const Subject=require("../modles/subject");
router.post('/usersearch/create',auth,async (req,res)=>{
    const usersearch=new UserSearch({user_id:req.user._id});
    
    try{
        await usersearch.save();
        res.send("hahah");
    }
    catch(e)
    {
        res.status(400).send(e);
    }
})


router.post('/test',auth,async (req,res)=>{




   
try{
    if(req.query.search.length>5)
    {
        const take=await UserSearch.findOneAndUpdate({user_id:req.user._id}, { $set: { search_input: req.query.search }},{useFindAndModify: false});
       
    }

    /*****************user subject wise question search************** */
    if(req.user.sem)
    {
        var userSubject=await Subject.find({sem_name:req.user.sem,year_name:req.user.year});
        var subjectidColl=userSubject.map((item)=>{
            return item._id;
        });
    }
 else{
    var userSubject=await Subject.find({year_name:req.user.year})
    var subjectidColl=userSubject.map((item)=>{
        return item._id;
    });
 }

    const questionwithsubject = await Question.find();
    
    const question=questionwithsubject.filter((item)=>{
        
        const quCol=subjectidColl.map((su)=>{
            
           if(item.subject_id.toString()===su.toString())
           {
               return item.title;
           }
        });
        var count=0;
       for(let i=0;i<quCol.length;i++)
       {
           if(quCol[i]!==undefined)
           {
               count++;
           }
       }
       if(count>0)
       {
           return quCol;
       }
        
       
    });
   
   
 
    const questiontitleswithId=question.map((item)=>{
        return {id:item._id,title:item.title};
    
    });
    const questiontitles=question.map((item)=>{
        return item.title;
    
    });
    
    
  
    options = {scorer: fuzz.partial_ratio};
    const testResult=fuzz.extract(req.query.search,questiontitles,options);
    
    const filterTitle=testResult.filter((item)=>{
        if(item[1]>90)
        {
            return item;
        }
     
    });
    const titleColl=filterTitle.map((item)=>{
        return item[0];
    })
    
    const newFilterTitle=questiontitleswithId.filter((item,index)=>{
        return titleColl.includes(item.title);
    });


    if(newFilterTitle.length===0)
    {
       res.json({newFilterTitle:[{id:123098,title:"No match question found, add question to get answer"}]});
    }
    else{
        
        res.json({newFilterTitle:newFilterTitle});
    }

}
catch(e)
{
res.status(400).send(e);
}

});
router.post("/moresearchQuestion",auth,async (req,res)=>{
    try{
        
        const question=await Question.find(({_id:req.query.id}));
     
        const {_id,title}=question[0];
        
        let moreQuesitonColl=[{_id,title}];
        let tempColl=[];
        
        for(let i=0;i<req.body.searchColl.length;i++)
        {
     
            if(req.body.searchColl[i].id.toString()===req.query.id.toString())
            {
                continue;
            }
            else{
            tempColl.push(req.body.searchColl[i]);
        }
        }
        moreQuesitonColl.push(tempColl)
        res.json({moreQuestionCollection:moreQuesitonColl})
    }
    catch(e)
    {

    }
})
module.exports=router;
