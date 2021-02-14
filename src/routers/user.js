const express=require("express");
const User=require("../modles/user");
const auth=require('../middleware/auth');
const Faculty=require("../modles/faculty");
const Questions=require('../modles/question');
const Answer=require('../modles/answer');
const multer = require('multer');
const sharp=require('sharp');
const Subject=require("../modles/subject");
const { response } = require("express");
const bcrypt=require("bcryptjs");
const { db } = require("../modles/question");
const UserSearch = require("../modles/usersearch");
const fuzz=require("fuzzball");
const fs=require('fs');
const FriendRequest = require("../modles/friendRequest");

const router=new express.Router();


// router.post('/users',async (req,res)=>{
//     const user=new User(req.body);
   
//     try{
//        await user.save();
       
//         const token=await user.generateAuthToken();

//         const questions=await Questions.find();
//         if(user.sem)
//         {
//             var subject=await Subject.find({faculty_name:user.faculty,sem_name:user.sem});
//         }
//         else{
//             var subject=await Subject.find({faculty_name:user.faculty,year_name:user.year});
//         }
//         const tokens=`?Authorization=Bearer ${user.token}`;
//        const questionArr= questions.map((item)=>{
//             const { _id,title,user_id,createdAt,updatedAt }=item;
//             return {_id,title,user_id,createdAt,updatedAt,tokens};
//         });
       
//         if(user.sem)
//         {
//             var divisionsem=user.sem;
//             isSem=true;
//         }
//         else{
//             var divisionyear=user.year;
//             isSem=false;
//         }
        
//         res.status(201).render('sub-main/index',{
       
//             questions:questionArr,
//             token:`?Authorization=Bearer ${token}`,
//             subjects:subject,
//             divisionsem:divisionsem,
//             divisionyear:divisionyear,
//             isSem:isSem            
//         })
       
//     }
//     catch(e)
//     {
//         res.status(400).send({error:e});
//     }
// });


router.post('/users',async (req,res)=>{
  
    const user=new User(req.body);
    const usersearch=new UserSearch({
        user_id:user._id
    });
  
    try{
    
       await user.save();
       
       await usersearch.save();
       
      
        
        const semster=await Faculty.findOne({name:user.faculty});
        
         
        res.json({
            success:true,    
            sem:semster.sem,
            userId:user.id,
       
        })
       
    }
    catch(e)
    {
        res.status(400).send(e);
    }
});










router.post('/user/login',async (req,res)=>{
  
    let isSem='';

    try{
       
       
     
        
        const user=await User.findByCredentials(req.body.email,req.body.password);
   
        const token=await user.generateAuthToken();

        
        const users=await User.find();
        const friendRequest=await FriendRequest.find();


      //****************code for recomendation************** */
      const questiontitlecarrier=[];
      const subjectforquestion=await Subject.find({sem_name:user.sem,year_name:user.year})
      const questionsforquestion=await Questions.find();
     
      /****************question return garna based on sem/year subject**********  */
      const subjectquestion=subjectforquestion.map((item)=>{
         const questionColl= questionsforquestion.filter((que)=>{
              return item._id.toString()===que.subject_id.toString();

          });
         
          return questionColl;


      });
      
      /******************yesma subject wise question ko title matra nikaleko */
      subjectquestion.forEach((item)=>{
          item.forEach((item2)=>{
              questiontitlecarrier.push(item2.title);
          })
      })
      
      




      
      const answers=await Answer.find();
   
      const userSearch=await UserSearch.find({user_id:user._id});
    
      options = {scorer: fuzz.partial_ratio};
     
    
     
      const testResult=fuzz.extract(userSearch[0].search_input,questiontitlecarrier,options);
      
      const filtertitles=testResult.filter((item)=>{
          return item[1]>30;
      });
      
      const minimizetitle=filtertitles.map((items)=>{
          return items[0];
      })
     
     


      if(user.sem)
      {
          var subject=await Subject.find({faculty_name:user.faculty,sem_name:user.sem});
      }
      else{
          var subject=await Subject.find({faculty_name:user.faculty,year_name:user.year});
      }
    
      
      
     let questionArr= questionsforquestion.map((item)=>{
     
        /************recommedation question ko profilee***************** */
        const userwithAvatar=users.filter(user=>{
       
       
            return user._id.toString()===item.user_id.toString()
        })
        let isThisMyQuestionColl=user._id.toString()===item.user_id.toString();
    
     
        let userAvatar =`data:image/png;base64,${userwithAvatar[0].avatar.toString('base64')}`;
        
         const answ= answers.filter((ans)=>{
             return ans.q_id.toString()===item._id.toString();
         });
         
         if(answ.length>0)
         {
              var isAnswer=true;
         }
         else{
             var isAnswer=false;
         }
       
          const { _id,title,user_id,createdAt,updatedAt }=item;
          let mintitle=minimizetitle.filter((min)=>{
              return min===title;
          });
         

         
          if(mintitle.length>0)
          {
              return {_id,title:mintitle,user_id,createdAt,updatedAt,isAnswer,userAvatar,username:userwithAvatar[0].username,isThisMyQuestionColl};

          }
          
      });
     
     questionArr=questionArr.filter((item)=>{
         return item!==undefined;
     });
     
   
      for(let i=0;i<questionArr.length;i++)
      {
          const random=Math.floor(Math.random()*questionArr.length);
          let temp=questionArr[0];
          questionArr[0]=questionArr[random];
          questionArr[random]=temp;
      }
      
      if(user.sem)
      {
          var divisionsem=user.sem;
          isSem=true;
      }
      else{
          var divisionyear=user.year;
          isSem=false;
      }

  
      res.json({
     
          questions:questionArr,
          token:`?Authorization=Bearer ${token}`,
          subjects:subject,
          divisionsem:divisionsem,
          divisionyear:divisionyear,
          isSem:isSem,
          username:user.username,
          allDone:true,
          user_id:user._id,
          
       
          
      })
  }
      catch(e){
          res.status(400).send();
      }
});

router.post('/homerefresh',auth,async (req,res)=>{
    let isSem='';
   
    try{
        
        const users=await User.find();
    

      //****************code for recomendation************** */
      const questiontitlecarrier=[];
      const subjectforquestion=await Subject.find({sem_name:req.user.sem,year_name:req.user.year})
      const questionsforquestion=await Questions.find();
      const friendRequest=await FriendRequest.find();
      
      /****************question return garna based on sem/year subject**********  */
      const subjectquestion=subjectforquestion.map((item)=>{
         const questionColl= questionsforquestion.filter((que)=>{
              return item._id.toString()===que.subject_id.toString();

          });
         
          return questionColl;


      });
      /******************yesma subject wise question ko title matra nikaleko */
      subjectquestion.forEach((item)=>{
          item.forEach((item2)=>{
              questiontitlecarrier.push(item2.title);
          })
      })
      
      




      
      const answers=await Answer.find();
      const userSearch=await UserSearch.find({user_id:req.user._id});
      
      options = {scorer: fuzz.partial_ratio};
     
      
     
      const testResult=fuzz.extract(userSearch[0].search_input,questiontitlecarrier,options);
     
      const filtertitles=testResult.filter((item)=>{
          return item[1]>30;
      });
     
      const minimizetitle=filtertitles.map((items)=>{
          return items[0];
      })
     
     


      if(req.user.sem)
      {
          var subject=await Subject.find({faculty_name:req.user.faculty,sem_name:req.user.sem});
      }
      else{
          var subject=await Subject.find({faculty_name:req.user.faculty,year_name:req.user.year});
      }
    
      
      
     let questionArr= questionsforquestion.map((item)=>{
     
        /************recommedation question ko profilee***************** */
        const userwithAvatar=users.filter(user=>{
       
       
            return user._id.toString()===item.user_id.toString()
        })
  
        let isThisMyQuestionColl=req.user._id.toString()===item.user_id.toString();
      


     
        let userAvatar =`data:image/png;base64,${userwithAvatar[0].avatar.toString('base64')}`;
        
         const answ= answers.filter((ans)=>{
             return ans.q_id.toString()===item._id.toString();
         });
         
         if(answ.length>0)
         {
              var isAnswer=true;
         }
         else{
             var isAnswer=false;
         }
       
          const { _id,title,user_id,createdAt,updatedAt }=item;
          let mintitle=minimizetitle.filter((min)=>{
              return min===title;
          });
         
       

          if(mintitle.length>0)
          {
              return {_id,title:mintitle,user_id,createdAt,updatedAt,isAnswer,userAvatar,username:userwithAvatar[0].username,isThisMyQuestionColl};

          }
          
      });
     
     questionArr=questionArr.filter((item)=>{
         return item!==undefined;
     });
     
   
      for(let i=0;i<questionArr.length;i++)
      {
          const random=Math.floor(Math.random()*questionArr.length);
          let temp=questionArr[0];
          questionArr[0]=questionArr[random];
          questionArr[random]=temp;
      }
      
      if(req.user.sem)
      {
          var divisionsem=req.user.sem;
          isSem=true;
      }
      else{
          var divisionyear=req.user.year;
          isSem=false;
      }

      
      res.json({
     
          questions:questionArr,
  
          subjects:subject,
          divisionsem:divisionsem,
          divisionyear:divisionyear,
          isSem:isSem,
          username:req.user.username,
          allDone:true,
          user_id:req.user._id,
          
       
          
      })
  }

    
    catch(e){

    }
})
router.post('/user/logout',auth,async (req,res)=>{
    try{
       
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token;
        })
        await req.user.save();
        res.json({redirect:'/'})
    }
    catch(e){
   
    }
});





const upload=multer({
    limits:{
        fileSize:3000000
    },
    fileFilter(req,file,cb){
        
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
         cb(new Error("Please upload images only"));
        }
        
     
       else{
           cb(undefined,true);
       }
    }

})

//*******************profile picture */
router.post("/user/set/profilepicture",upload.single('file'),async (req,res)=>{
    let userAvatar='';
    const buffer=await sharp(req.file.buffer).resize({width:150,height:150}).png().toBuffer();
   const user=await User.findById(req.query.userId);
   const token=await user.generateAuthToken();
    user.avatar=buffer;
    await user.save();


       const users=await User.find();
      //****************code for recomendation************** */
      const questiontitlecarrier=[];
      const subjectforquestion=await Subject.find({sem_name:user.sem,year_name:user.year})
      const questionsforquestion=await Questions.find();
      const friendRequest=await FriendRequest.find();
      /****************question return garna based on sem/year subject**********  */
      const subjectquestion=subjectforquestion.map((item)=>{
         const questionColl= questionsforquestion.filter((que)=>{
              return item._id.toString()===que.subject_id.toString();

          });
         
          return questionColl;


      });
      /******************yesma subject wise question ko title matra nikaleko */
      subjectquestion.forEach((item)=>{
          item.forEach((item2)=>{
              questiontitlecarrier.push(item2.title);
          })
      })
      
      




      
      const answers=await Answer.find();
      const userSearch=await UserSearch.find({user_id:user._id});
      
      options = {scorer: fuzz.partial_ratio};
     
      
     
      const testResult=fuzz.extract(userSearch[0].search_input,questiontitlecarrier,options);
     
      const filtertitles=testResult.filter((item)=>{
          return item[1]>30;
      });
     
      const minimizetitle=filtertitles.map((items)=>{
          return items[0];
      })
     
     


      if(user.sem)
      {
          var subject=await Subject.find({faculty_name:user.faculty,sem_name:user.sem});
      }
      else{
          var subject=await Subject.find({faculty_name:user.faculty,year_name:user.year});
      }
    
     
      
     let questionArr= questionsforquestion.map((item)=>{
        const userwithAvatar=users.filter(user=>{
       
       
            return user._id.toString()===item.user_id.toString()
        })
        let isThisMyQuestionColl=user._id.toString()===item.user_id.toString();
       
        if(userwithAvatar.length>0){
             userAvatar =`data:image/png;base64,${userwithAvatar[0].avatar.toString('base64')}`;

        }
         const answ= answers.filter((ans)=>{
             return ans.q_id.toString()===item._id.toString();
         });
         
         if(answ.length>0)
         {
              var isAnswer=true;
         }
         else{
             var isAnswer=false;
         }
           
          const { _id,title,user_id,createdAt,updatedAt }=item;
          let mintitle=minimizetitle.filter((min)=>{
              return min===title;
          });
         
          if(mintitle.length>0)
          {
              return {_id,title:mintitle,user_id,createdAt,updatedAt,isAnswer,userAvatar,isThisMyQuestionColl};

          }
          
      });
     
     questionArr=questionArr.filter((item)=>{
         return item!==undefined;
     });
     
   
      for(let i=0;i<questionArr.length;i++)
      {
          const random=Math.floor(Math.random()*questionArr.length);
          let temp=questionArr[0];
          questionArr[0]=questionArr[random];
          questionArr[random]=temp;
      }
      
      if(user.sem)
      {
          var divisionsem=user.sem;
          isSem=true;
      }
      else{
          var divisionyear=user.year;
          isSem=false;
      }

    
    res.json({
      
        imgBuffer:buffer,
        questions:questionArr,
        subjects:subject,
        divisionsem:divisionsem,
        divisionyear:divisionyear,
        isSem:isSem,
        username:user.username,
        token:`?Authorization=Bearer ${token}`,
        
     
        
    });





},(error,req,res,next)=>{

});





router.post('/user/set/division',async (req,res)=>{
    try{
     
        const user=await User.findById(req.body.userId)
       
        if(req.body.sem===false)
        {
            
            user.year=req.body.value.year;
        }
        else{
            user.sem=req.body.value.sem;
            user.year=req.body.value.year;
        }
       
       
        await user.save();

        res.json({
            divisionSuccess:true
        })
    }
    catch(e)
    {
        res.status(400).send();
    }
})




router.post('/user/update',auth,async (req,res)=>{
   
    const updates=Object.keys(req.body);
    const allowedUpdates=['username'];
    const isValidOperation=updates.every((update)=>{
        return allowedUpdates.includes(update);
    });
    if(!isValidOperation)
    {
        return res.status(400).status({error:"invalid updates!"});
    }
    try{
        updates.forEach((update)=>{
            req.user[update]=req.body[update];
        });
    
        await req.user.save();
        res.json({
            success:"Update Successfully",   
        });
    }
    catch(e)
    {
        res.json({
            
            error:"Update Failed",    
        });
    }
})
router.post('/user/update/password',auth,async (req,res)=>{
    try{
      
  const isMatch=await bcrypt.compare(req.body.oldpassword,req.user.password);

  if(!isMatch)
  {
      throw new Error("Old password doesnt match");
  }

    req.user['password']=req.body['newpassword'];
    await req.user.save();
    res.json({ 
        success:"success" 
    });

}
catch(e)
{
    res.status(400).render('navExplore/profiles/index',{
        token:`?Authorization=Bearer ${req.token}`,
        error:e,    
    });
}
});










//update profile
router.post('/user/profilepic',auth,upload.single('file'),async (req,res)=>{
   
    const buffer=await sharp(req.file.buffer).resize({width:150,height:150}).png().toBuffer();
    req.user.avatar=buffer;
    await req.user.save();
 
    res.json({success:'back'});


},(error,req,res,next)=>{
    res.status(400).render('navExplore/profiles/index',{
        token:`?Authorization=Bearer ${req.token}`,
        error:error.message,    
    });

});

router.get("/user/profile",auth,async (req,res)=>{
    try{
        const user=await User.findById(req.user._id);
        if(!user||!user.avatar)
        {

            throw new Error();
        }
      
        res.set('Content-Type','image/jpg');
       
        res.send(user.avatar);
    }
    catch(e)
    {
        res.status(400).send();
    }

});
router.get("/user/profile",auth,async (req,res)=>{
    try{
        const user=await User.findById(req.user._id);
        if(!user||!user.avatar)
        {

            throw new Error();
        }
      
        res.set('Content-Type','image/jpg');
       
        res.send(user.avatar);
    }
    catch(e)
    {
        res.status(400).send();
    }

});
// router.get("/answer/profile",auth,async (req,res)=>{
//     try{
//         const user=await User.findById(req.user._id);
//         if(!user||!user.avatar)
//         {

//             throw new Error();
//         }
//         res.set('Content-Type','image/jpg');
     
//         res.send(user.avatar);
//     }
//     catch(e)
//     {
//         res.status(400).send();
//     }

// });



module.exports=router;