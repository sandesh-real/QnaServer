
/************************************all variable decleration******************************** */
var optNum=0
var countListElemet=0;
var onetag;
var twotag;
var checkedValue=0;
var tagArr=[];
var questionImage='';



/*************************************img show*****************************************/
    document.querySelector(".image-box").addEventListener('change',(e)=>{
    document.querySelector('.img-show').classList.add('img-show-hide');
     var reader=new FileReader();
     var imageField=document.querySelector('#image-field');
     reader.onload=function()
     {
         if(reader.readyState==2)
         {
             imageField.src=reader.result;
             questionImage=reader.result;   
         }
     }
     reader.readAsDataURL(e.target.files[0]);
        
    });

    /****************************add tag javascript*************************************/

document.querySelector('.tag-selected-lists').addEventListener('click',(e)=>{

    if(e.target.tagName=="LABEL")
    {
        targetName=`#${e.target.parentNode.firstChild.id}`;
       
    }
    else{
     targetName=`#${e.target.id}`;
    
    }
   
   
    var tagValue=document.querySelector(targetName);
  
    if(tagValue.checked)
    {
        if(e.target.tagName=="LABEL")
        {
            checkedValue--;
        }
       checkedValue++;
   
       
    }
    else if(!tagValue.checked)
    {
        if(e.target.tagName=="LABEL")
        {
            checkedValue++;
           
        }
        checkedValue--;
      
    }
    if(checkedValue==2)
    {
        var s=document.querySelectorAll('.tag-checkedBox');
        s.forEach((e)=>{
            if(!e.checked)
            {
                e.disabled=true;
            }
        });
    }
    if(checkedValue<2)
    {
        var s=document.querySelectorAll('.tag-checkedBox');
        s.forEach((e)=>{
            if(!e.checked)
            {
                e.disabled=false;
            }
        });
    }
});






/*************************************add question javascript*****************************88 */
var toggleFunction = ()=>{
          
    document.querySelector('.popup').classList.toggle('select');
}
document.querySelector('.popup').addEventListener('click',(e)=>{
if(e.target.className!="question-form" && e.target.tagName!="SELECT" && e.target.tagName!="LABEL" && e.target.tagName!="INPUT" && e.target.className!="add-tag-btn" && e.target.tagName!="BUTTON" && e.target.tagName!="I")
{
    document.querySelector('.popup').classList.remove('select');
}


});


/************************************add question after click btn******************************* */

var element=document.querySelector('#question-btn');

 element.addEventListener('click',toggleFunction);
  document.querySelector('.close').addEventListener('click',toggleFunction);




  /*************more option****************88888888 */