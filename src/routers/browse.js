const express=require('express');
const auth=require('../middleware/auth');
const router=new express.Router();
const Questions=require('../modles/question');
const Answer=require('../modles/answer');
const Faculty=require("../modles/faculty");
const Subject=require("../modles/subject");
const User = require('../modles/user');
const Comment=require("../modles/comment");
const SubComment=require("../modles/subcomment");
const NotificationData=require("../modles/notificationData");
const UserSearch = require("../modles/usersearch");
const fuzz = require('fuzzball');
const Likes=require("../modles/likes");
const Dislikes=require("../modles/dislikes");


router.get('/authpage',async (req,res)=>{
    const faculties=await Faculty.find({});
    const faculty=faculties.map((item)=>{
       return {name:item.name}
    })
    res.json({facultyName:faculty});
});

router.get('/divisions/index',(req,res)=>{
    res.render('divisions/index');
});
router.post('/',auth,async (req,res)=>{
   
   
    let isSem='';
    try{
       
        //****************code for recomendation************** */
        const questiontitlecarrier=[];
        const subjectforquestion=await Subject.find({sem_name:req.user.sem,year_name:req.user.year})
        const questionsforquestion=await Questions.find();
       
        const subjectquestion=subjectforquestion.map((item)=>{
           const questionColl= questionsforquestion.filter((que)=>{
                return item._id.toString()===que.subject_id.toString();

            });
           
            return questionColl;
          


        });
       
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
        
        const subjectwithtoken=subject.map((item)=>{
            const {subjectname}=item;
            return {subjectname};
        })
       

        
       let questionArr= questionsforquestion.map((item)=>{
       
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

           
            const { _id,title,user_id,createdAt,updatedAt,annonymity }=item;
           
            /*******************checking for delete*********** */
           if(user_id.toString()===req.user._id.toString())
           {
               var usersAnswer=true;
           }
           else{
               var usersAnswer=false;
           }



            let temp='A';
           
            let mintitle=minimizetitle.filter((min)=>{
               
                if(temp!==min){
                   temp=min;
                return min===title;
                }
            });
        
            if(mintitle.length>0)
            {
                return {_id,title:mintitle,user_id,createdAt,updatedAt,isAnswer,usersAnswe,annonymity};

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
      
      console.log(questionArr)
        res.json({
       
            questions:questionArr,
            token:`?Authorization=Bearer ${req.token}`,
            subjects:subjectwithtoken,
            divisionsem:divisionsem,
            divisionyear:divisionyear,
            isSem:isSem,
            username:req.user.username,
            allDone:true
            
        })
    }
        catch(e){
            res.status(400).send();
        }
  
    
    });
router.get('/navExplore/subject/',auth,async (req,res)=>{
    try{
       
        if(req.user.sem)
        {
            var subject=await Subject.find({faculty_name:req.user.faculty,sem_name:req.user.sem});
        }
        else{
            var subject=await Subject.find({faculty_name:req.user.faculty,year_name:req.user.year});
        }
        const motoken=`?Authorization=Bearer ${req.token}`;
        const subjectwithtoken=subject.map((item)=>{
            const {subjectname}=item;
           
            return {subjectname,token:motoken};
        });

        const subjectForName=await Subject.findOne({subjectname:req.query.subjectname});
       
        const question=await Questions.find({subject_id:subjectForName._id});
        const answers=await Answer.find();
        const questions=question.map((item)=>{
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
            const {_id,title,user_id}=item;
               /*******************checking for delete*********** */
           if(user_id.toString()===req.user._id.toString())
           {
               var usersAnswer=true;
           }
           else{
               var usersAnswer=false;
           }
           
            return {_id,title,motoken,usersAnswer,isAnswer}
        });
        
        res.render('navExplore/subject/index',{
            


            token:`?Authorization=Bearer ${req.token}`,
            subjects:subjectwithtoken,
            questions
        });

        
    }
    catch(e)
    {
        res.status(400).send();
    }
   
});

router.get('/navExplore/notifications/',auth,async (req,res)=>{

    try{
        let isAnswer=true;
        let isNoti=true;
        let count=0;
        const notifi=await NotificationData.find({user_id:req.user._id});
    
        const notiInfo=notifi.map((item)=>{
            if(item.answer_count===0)
            {
                isAnswer=false;
            }
            const motoken=`?Authorization=Bearer ${req.token}`;
           return  {noti:item.notification_type,question_id:item.question_id,motoken:motoken,isFalse:isAnswer};
        });
        notifi.forEach((item)=>{
            if(item.answer_count>0)
            {
                count++;
            }
        })
        
        if(count===0)
        {
            isNoti=false;
        }
        res.render("navExplore/notifications/index",{
            token:`?Authorization=Bearer ${req.token}`,
            notificationList:notiInfo,
            isNoti
        })
    }
    catch(e)
    {
        res.status(400).send(e);
    }
  
});

router.get('/navExplore/profiles/',auth,async (req,res)=>{

        res.render('navExplore/profiles/index',{
            token:`?Authorization=Bearer ${req.token}`,
            user:req.user
           
        });
});





router.get('/navExplore/YourQuestion/',auth,async (req,res)=>{

    const questions=await Questions.find({user_id:req.user._id});
    
    res.render('navExplore/YourQuestion/index',{
        token:`?Authorization=Bearer ${req.token}`,
        questions

    });
});
router.post('/viewAnswer',auth,async (req,res)=>{
     
        try{
         
            
            const question=await Questions.findById(req.query.id);
            const answers=await Answer.find({q_id:req.query.id});
            const users=await User.find();
            const comments=await Comment.find();
            const likes=await Likes.find();
            const dislikes=await Dislikes.find();
            
           
     /*****************8888question avatar finder */
        // const userWithQuestion=users.filter((user)=>{
            
        //     return user._id.toString()===question.user_id.toString();
        // })
      
        const userWithQuestion=[];
        for(let i=0;i<users.length;i++)
        {
            if(users[i]._id.toString()===question.user_id.toString())
            {
                userWithQuestion.push(users[i]);
                break;
            }
        }
        let userQuestionAvatar=`data:image/png;base64,${userWithQuestion[0].avatar.toString('base64')}`;
        
        if(answers.length>0)
        {
       
       var answersColl=answers.map((ans)=>{

        let isThisMyAnswerColl=ans.user_id.toString()===req.user._id.toString();

        let isLikeBol=false;
        let isDisLikeBol=false;
            const {_id,user_id,q_id,answer,createdAt}=ans;
            /***********like and dislike views"**** */

            const likeCount=likes.filter((item)=>{
                return item.answer_id.toString()===_id.toString();
            })
            const dislikeCount=dislikes.filter((item)=>{
                return item.answer_id.toString()===_id.toString();
            })
           const commentCount=comments.filter((item)=>{
               return item.answer_id.toString()===_id.toString();
           })
           const isLike=likeCount.filter((item)=>{
               return item.user_id.toString()===req.user._id.toString();
           })
           const isDisLike=dislikeCount.filter((item)=>{
            return item.user_id.toString()===req.user._id.toString();
        })
            if(isLike.length>0)
            {
                isLikeBol=true;
                isDisLikeBol=false;
            }
            if(isDisLike.length>0)
            {
                isDisLikeBol=true;
                isLikeBol=false;
            }
            
            const user=users.filter((us)=>{
               
                return us._id.toString()===user_id.toString();
            })
            
            const {username,avatar}=user[0];
 

                const createdDate=new Date(createdAt).toDateString();
       
   
             const AnswerAvatar = `data:image/png;base64,${avatar.toString('base64')}`;;
           
             if(q_id.toString()===question._id.toString())
             {
             return {_id,answer,AnswerAvatar:AnswerAvatar,likesCnt:likeCount.length,dislikeCnt:dislikeCount.length,commentCnt:commentCount.length,username,createdDate,isLikeBol,isDisLikeBol,answerUserId:user[0]._id,isThisMyAnswerColl}
             }
             
        });
        
        moanswers=[{question:question.title,annonymity:question.annonymity,isEmpty:false,questionAvatar:userQuestionAvatar,username:userWithQuestion[0].username,user_id:userWithQuestion[0]._id},answersColl]
       
    }
    else{
        moanswers=[{question:question.title,annonymity:question.annonymity,isEmpty:true,questionAvatar:userQuestionAvatar,username:userWithQuestion[0].username,user_id:userWithQuestion[0]._id}];

    }

  
    //***************Comment******I */
    
  
            res.json({
                id:req.query.id,
                answers:moanswers,
                
               
                
            });
            
        }
        catch(e)
        {
            res.status(400).send(e);
        }
    
});


module.exports=router;