
//*************more option nav bar ko*************/
document.querySelectorAll('.Logout').forEach((item)=>{
    item.addEventListener('click',(e)=>{
   
        document.querySelector(".moreOption-list").classList.toggle('nav_more_option');
        })
});


//8888888888menu item select color change*********/

document.querySelectorAll('.menu-select').forEach((item)=>{
    
    item.addEventListener("click",(e)=>{
        console.log(e);
        item.classList.toggle("select");
    });
   
})




/************************add question button********************/

document.querySelector("#addQuestionBtn").addEventListener('click',(req,res)=>{
   
        const searchValue= document.querySelector(".searchvalueforquestion").value;
        document.querySelector('.popup').classList.add('select');
        document.querySelector('.question-input input').value=searchValue;
 
  
});

window.addEventListener("click",(e)=>{
  
    if(e.target.className!=="search-icon" && e.target.className!=="searchvalueforquestion" && e.target.className!=="searchForm")
    {
        document.querySelector('.searchOutput').classList.remove('searchOutputDisplay');
    }
})




   //search box 


   const fun=async (searchValue,token)=>{
  
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
        if(data==='No match found Please Click add question')
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
    fun(e.target.value,e.target.id);
});




//****************notification*********************/
async function notificationStatus()
{   
    let count=0;
    const token=document.querySelector(".menu-red").id;
    
    const response=await fetch(`http://localhost:3000/notification/statuscheck${token}`);
    
    const status=await response.json();
    
  for(stat of status[0])
    {
        if(stat===false)
        {
            count++;
        }
    }
    console.log(count);
    console.log(token.slice(22,token.length),status[1]);
    console.log(token.slice(22,token.length)===status[1]);
    if(count>0 && token.slice(22,token.length)===status[1])
    {
        
  document.querySelector(".menu-red").classList.add("nav-color-red");
    }
}
// async function notification()
// {
//     let count=0;
//     const noti=await fetch("http://localhost:3000/notification/answercount?Authorization=Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFlN2M5ZDcxYTE0MjAwYzAxNTc4NDMiLCJpYXQiOjE1OTY0MjU4ODh9.jY-RbHaTFh2-RZJonWs-vVp0ovKnl-yLXDkHV26IEfU");
//     const result=await noti.json();
//     let notiCont=document.querySelector(".notification-container");
//     for(res of result)
//     {
//         console.log(res.status);
//         if(res.status==="true"){
//             count++;
//             console.log(count);
//         notiCont.innerHTML+=`<div class="notification-box">

//         <a href="../../viewAnswer/index.html" class="notification-box-container">
//         <div class="notification-text">
//            <h2>Your Posted Question "${res.questionTitle}" has
//               been answered by ${anslen} people.  </h2>
//         </div>
//         </a>
//         <div class="notification-content-more-option">
//           <div class="more-option">
//               <button class="option-anchor opt-1">
//                <div class="cir-1"></div>
//                <div class="cir-2"></div>
//                <div class="cir-3"></div>
//            </button>
//           <div class="more-option-container-1 for-all-option" id="closeMoreOption">
//               <div class="more-option-second-container">
//               <a href="#">delete</a>
//               <a href="#">report</a>
//           </div>
//           </div>
//            </div>
//         </div>
//         </div>`
//     }
 
// }
// if(count<=0)
// {
//     notiCont.innerHTML="<h1 style='text-align:center'>No Notification</h1>";
// }

// }
notificationStatus();


document.querySelector(".menu-red").addEventListener("click",async (e)=>
{
    const token=e.target.id;
 await fetch(`http://localhost:3000/notification/statustrue${token}`);

});





/*************************more option***************** */
document.querySelectorAll(".more-option").forEach((item)=>{
    item.addEventListener("click",()=>{
        item.querySelector(".for-all-option").classList.toggle("more-option-active");
})
});
window.addEventListener("click",(e)=>{
    console.log(e.target.className);
    if(e.target.className!=="more-option-delete" && e.target.className!=="more-option-edit" &&  e.target.className!=="more-option-report" && e.target.className!=="for-all-option" && e.target.className!=="option-anchor"  && e.target.className!=="cir-1"&&e.target.className!=="cir-2" && e.target.className!=="cir-3")
    {
        document.querySelectorAll(".for-all-option").forEach((item)=>{
            item.classList.remove("more-option-active");
        })

    }
})