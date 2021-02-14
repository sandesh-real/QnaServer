/*******************************responsive nav bar javascript******************** */

document.querySelector('.small-nav').addEventListener('click',()=>{
    document.querySelector('.nav-container').classList.toggle('main__nav--lists-click');
    });
    
    
 
///profile change info btns 

//*****this is for users edit */
document.querySelector('#edit-profile').addEventListener('click',()=>{

const userInfo=document.querySelector('.user-info-container');

const questionInfo=document.querySelector('.yourQuestions');
const securityInfo=document.querySelector('.yourSecurity');
const answerInfo=document.querySelector('.yourAnswers');
userInfo.classList.add("user-info-container-display");
questionInfo.classList.remove("yourQuestions-display");
answerInfo.classList.remove("yourAnswers-display");
securityInfo.classList.remove("yourSecurity-display");
document.querySelector('.focusProfile').focus();
});

/*********this is for user questions */
document.querySelector('#your-question').addEventListener('click',()=>{

    const userInfo=document.querySelector('.user-info-container');
    const questionInfo=document.querySelector('.yourQuestions');
    const securityInfo=document.querySelector('.yourSecurity');
    const answerInfo=document.querySelector('.yourAnswers');
    userInfo.classList.remove("user-info-container-display");
    questionInfo.classList.add("yourQuestions-display");
    answerInfo.classList.remove("yourAnswers-display");
    securityInfo.classList.remove("yourSecurity-display");
    
    });



/**************************this is for user answers */
    document.querySelector('#your-answer').addEventListener('click',()=>{

        const userInfo=document.querySelector('.user-info-container');
        const questionInfo=document.querySelector('.yourQuestions');
        const securityInfo=document.querySelector('.yourSecurity');
        const answerInfo=document.querySelector('.yourAnswers');
        userInfo.classList.remove("user-info-container-display");
        questionInfo.classList.remove("yourQuestions-display");
        answerInfo.classList.add("yourAnswers-display");
        securityInfo.classList.remove("yourSecurity-display");
        
        });
/**************************this is for change password */
document.querySelector('#edit-password').addEventListener('click',()=>{

    const userInfo=document.querySelector('.user-info-container');
    const securityInfo=document.querySelector('.yourSecurity');
    const questionInfo=document.querySelector('.yourQuestions');
    const answerInfo=document.querySelector('.yourAnswers');
    userInfo.classList.remove("user-info-container-display");
    questionInfo.classList.remove("yourQuestions-display");
    answerInfo.classList.remove("yourAnswers-display");
    securityInfo.classList.add("yourSecurity-display");
    document.querySelector('.focusPassword').focus();
    });

    


        /**************Image show*********** */

    document.querySelector('#profile-btn').addEventListener('change',(e)=>{
    document.querySelector('#profile-change-btn').classList.add('profile-change-btn-display');
    var reader=new FileReader();
    var imageField=document.querySelector('.profile-pic');
        

    reader.onload=function()
    {
        if(reader.readyState==2)
        {
            imageField.src=reader.result;
        }
    }
    reader.readAsDataURL(e.target.files[0]);
    });


    /*************profile change button on and off */
    document.querySelector('#profile-change-btn').addEventListener('click',(e)=>{
        document.querySelector('#profile-change-btn').classList.remove('profile-change-btn-display');
    });


       //search box 


const funsearch=async (searchValue,token)=>{
    
    if(searchValue==='')
    {
        document.querySelector('.searchOutput').classList.remove('searchOutputDisplay');

    }
    else
    {
        const response=await fetch(`http://localhost:3000/test${token}&search=${searchValue}`);

        const data=await response.json();
        const ul=document.querySelector('.searchOutput_lists');
        console.log(data[0].title);
        if(data==='No match found Please add question')
        {
            document.querySelector('.searchOutput').classList.add('searchOutputDisplay');

            ul.innerHTML=data;
        }
        
        else{
            ul.innerHTML=data.map(item=>
                `<li><a href="../../viewAnswer/${token}&id=${item.id}">${item.title}</li>`
       
           ).join('');
           console.log(searchValue);
         
          
           document.querySelector('.searchOutput').classList.add('searchOutputDisplay');
           
        }
    }


}



document.querySelector(".question-search-box").addEventListener('input',(e)=>{
    funsearch(e.target.value,e.target.id);
});