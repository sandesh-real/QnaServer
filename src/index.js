const express=require("express");

// Load a plugin.

 
// Initialize editor.

require("./db/mongoosedb");
const cors=require('cors');
const browerRouter=require('./routers/browse');
const bodyParser=require('body-parser');


//requiring router function of models
const userRouter=require("./routers/user");
const answerRouter=require("./routers/answer");
const questionRouter=require("./routers/question");


const yearRouter=require("./routers/year");
const semRouter=require("./routers/sem");
const likeRouter=require("./routers/likes");
const commentRouter=require("./routers/comment");
const subcommentRouter=require("./routers/subcomment");
const tagRouter=require("./routers/tag");
const tagandquestionRouter=require("./routers/tagandquestion");
const searchRouter=require("./routers/search");
const adminRouter=require("./routers/admin");
const notificationRouter=require("./routers/notification");
const dislikeRouter=require("./routers/dislikes");
const notificationdataRouter=require("./routers/notificationData");
const deleteRouter=require("./routers/delete");
const friendRequestRouter=require("./routers/friendRequest");
const addFriendNotificaiton=require("./routers/addfriendNotification");
const subjectQuestion=require("./routers/SubjectQuestion");
//path for express front end
const app=express();





app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(userRouter);
app.use(browerRouter);
app.use(answerRouter);
app.use(questionRouter);


app.use(yearRouter);
app.use(semRouter);
app.use(likeRouter);
app.use(commentRouter);
app.use(subcommentRouter);
app.use(tagRouter);
app.use(tagandquestionRouter);
app.use(searchRouter);
app.use(adminRouter);
app.use(notificationRouter);
app.use(notificationdataRouter);
app.use(dislikeRouter);
app.use(deleteRouter);
app.use(friendRequestRouter)
app.use(addFriendNotificaiton);
app.use(subjectQuestion);


app.listen(3000,()=>{
    console.log("server is up");
})