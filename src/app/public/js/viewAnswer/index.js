
/********************javascript for comment and reply************ */

const commentBtn=document.querySelectorAll('.comment-btn');
commentBtn.forEach((item)=>{
item.addEventListener('click',(e)=>{
    if(e.target.className.slice(19,e.target.className.length)==="comment-icon")
    {
        e.target.parentNode.parentNode.nextElementSibling.classList.toggle('comment-container-active');

    }
    else{
    e.target.parentNode.nextElementSibling.classList.toggle('comment-container-active');
    }
});
});


//**************reply********************* */

document.querySelectorAll(".reply-comment-btn").forEach((item)=>{
    
    item.addEventListener("click",()=>{
    
        item.parentElement.parentElement.nextElementSibling.classList.toggle('reply-comment-hide-or-show');
    });
})






/*********************code for focus javascript*************************/




/***************************small nav or respoinsive nav */
document.querySelector('.small-nav').addEventListener('click',()=>{
    document.querySelector('.nav-container').classList.toggle('main__nav--lists-click');
    });


    /**********************************js for sidebar opner and closer*********************/

document.querySelector('.sidebarOpener').addEventListener('click',()=>{
    document.querySelector('aside').classList.add('aside-opener');
    document.querySelector('.sidebarOpener').classList.add('siderbarOpenerFixed');
    });
    
    document.querySelector('.sidebarCloser').addEventListener('click',()=>{
        document.querySelector('aside').classList.remove('aside-opener');
        document.querySelector('.sidebarOpener').classList.remove('siderbarOpenerFixed');
        });


        
  /*****************************more option buton***************************************/
 
document.querySelector('body').addEventListener('click',(e)=>{
  
    var num=chooseMoreOption(e);
    console.log(e);
  
//   e.target.tagName!='A'&& ///// future use for delete and report click;
//you more option ko box ho jun tyo box ra button bahek aru click gare close hunx
  if( e.target.id!='classMoreOption'&&((e.target.className!='cir-1'&&e.target.className!='cir-2'&&e.target.className!='cir-3') &&e.target.className!=`option-anchor opt-${num}`&&e.target.className!=`option-anchor-answer opt-${num}`&&e.target.className!=`option-anchor-comment opt-${num}`&&e.target.className!=`option-anchor-reply opt-${num}`))
  {

      document.querySelectorAll(`.for-all-option`).forEach((elm)=>{
        elm.classList.remove('more-option-active');
      });
  }

  /******************************yo xutta xuttai more option ko laagi in view answer page********************* */
 
      if((e.target.className=='cir-1'||e.target.className=='cir-2'||e.target.className=='cir-3') ||e.target.className==`option-anchor opt-${num}` ||e.target.className==`option-anchor-comment opt-${num}`||e.target.className==`option-anchor-answer opt-${num}`||e.target.className==`option-anchor-reply opt-${num}`)
       {

           if(e.target.parentNode.id=="option-anchor-comment"||e.target.id=="option-anchor-comment")
           {
        var moreOption=document.querySelector(`.more-option-container-comment-${num}`)
           }
           else if(e.target.parentNode.id=="option-anchor-reply"||e.target.id=="option-anchor-reply")
           {
        var moreOption=document.querySelector(`.more-option-container-reply-${num}`)
           }
           else if(e.target.parentNode.id=="option-anchor-answer"||e.target.id=="option-anchor-answer")
           {
        var moreOption=document.querySelector(`.more-option-container-answer-${num}`)
           }
           else{
          var moreOption=document.querySelector(`.more-option-container-${num}`);
        }
        
             moreOption.classList.toggle('more-option-active');
       }
    
  });
 
  /******************functino for chosse more option according to number */
 function chooseMoreOption(e)
 {
    
    if((e.target.className=='cir-1'||e.target.className=='cir-2'||e.target.className=='cir-3'))
    {
     
        //*******yo more option bata tesko number nikaleko************* */
        if(e.target.parentNode.id=="option-anchor-comment"){
            
                num=e.target.parentNode.className.substring(('option-anchor-answer opt-').length,e.target.parentNode.className.length);

            }
            else if(e.target.parentNode.id=="option-anchor-answer"){
            
                num=e.target.parentNode.className.substring(('option-anchor-answer opt-').length,e.target.parentNode.className.length);

            }
            else if(e.target.parentNode.id=="option-anchor-reply"){
            
                num=e.target.parentNode.className.substring(('option-anchor-reply opt-').length,e.target.parentNode.className.length);

            }
           
            else{
        num=e.target.parentNode.className.substring(('option-anchor opt-').length,e.target.parentNode.className.length);
  
            }
    }
    else{
        if(e.target.id=="option-anchor-comment"){
            num=e.target.className.substring(('option-anchor-comment opt-').length,e.target.className.length);
          
        }
        else if(e.target.id=="option-anchor-answer"){
            num=e.target.className.substring(('option-anchor-answer opt-').length,e.target.className.length);
            
        }
        else if(e.target.id=="option-anchor-reply"){
            num=e.target.className.substring(('option-anchor-reply opt-').length,e.target.className.length);
            
        }
        else
        {
      num=e.target.className.substring(('option-anchor opt-').length,e.target.className.length);
        }
    } 
 
    return num;
 }



/***************************************************view answer pop-up section************************************/


var element=document.querySelector('#add-answer-btn');

 element.addEventListener('click',()=>{
   
    document.querySelector('.popup').classList.toggle('select');
 });
  document.querySelector('.close').addEventListener('click',()=>{
    document.querySelector('.popup').classList.toggle('select'); 
  });

 
// document.querySelector('.popup').addEventListener('click',(e)=>{
// if(e.target.className!="question-form" && e.target.tagName!="SELECT" && e.target.tagName!="LABEL" && e.target.tagName!="INPUT" && e.target.className!="add-tag-btn" && e.target.tagName!="BUTTON" && e.target.tagName!="I")
// {
//     document.querySelector('.popup').classList.remove('select');
// }


// });

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
                `<li><a href="../viewAnswer/${token}&id=${item.id}">${item.title}</li>`
       
           ).join('');
           console.log(searchValue);
         
          
           document.querySelector('.searchOutput').classList.add('searchOutputDisplay');
           
        }
    }


}



document.querySelector(".question-search-box").addEventListener('input',(e)=>{
    funsearch(e.target.value,e.target.id);
});