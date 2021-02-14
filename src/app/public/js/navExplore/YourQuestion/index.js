
  /*****************************more option buton***************************************/
 
  document.querySelector('body').addEventListener('click',(e)=>{
  
    var num;
  console.log(e.target.parentNode);
  if((e.target.className=='cir-1'||e.target.className=='cir-2'||e.target.className=='cir-3'))
  {
      //*******yo more option bata tesko number nikaleko************* */
      num=e.target.parentNode.className.substring(('option-anchor opt-').length,e.target.parentNode.className.length);
  
  }
  else{
    num=e.target.className.substring(('option-anchor opt-').length,e.target.className.length);
  } 

//   e.target.tagName!='A'&& ///// future use for delete and report click;
//you more option ko box ho jun tyo box ra button bahek aru click gare close hunx
  if( e.target.id!='classMoreOption'&&((e.target.className!='cir-1'&&e.target.className!='cir-2'&&e.target.className!='cir-3') &&e.target.className!=`option-anchor opt-${num}`))
  {

      document.querySelectorAll(`.for-all-option`).forEach((elm)=>{
        elm.classList.remove('more-option-active');
      });
  }
  
  
      if((e.target.className=='cir-1'||e.target.className=='cir-2'||e.target.className=='cir-3') ||e.target.className==`option-anchor opt-${num}`)
       {
        
          var moreOption=document.querySelector(`.more-option-container-${num}`);
        
             moreOption.classList.toggle('more-option-active');
       }
    
  });
 

  /***************************small nav or respoinsive nav */
document.querySelector('.small-nav').addEventListener('click',()=>{
  document.querySelector('.nav-container').classList.toggle('main__nav--lists-click');
  });