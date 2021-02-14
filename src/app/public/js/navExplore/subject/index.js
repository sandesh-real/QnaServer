 /**********************************js for sidebar opner and closer*********************/

 document.querySelector('.sidebarOpener').addEventListener('click',()=>{
  document.querySelector('aside').classList.add('aside-opener');
  document.querySelector('.sidebarOpener').classList.add('siderbarOpenerFixed');
  });
  
  document.querySelector('.sidebarCloser').addEventListener('click',()=>{
      document.querySelector('aside').classList.remove('aside-opener');
      document.querySelector('.sidebarOpener').classList.remove('siderbarOpenerFixed');
      });
  

      /******************************nav js for responsive design******************************/


  document.querySelector('.small-nav').addEventListener('click',()=>{
    document.querySelector('.nav-container').classList.toggle('main__nav--lists-click');
    });
    