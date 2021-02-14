let registerBtn=document.querySelectorAll('#register__btn');
registerBtn.forEach(function(el){
  el.addEventListener('click',togglefunction);
});

function togglefunction()
{
  if(document.querySelector('.header__nav--register-btn').innerHTML==='Sign Up')
  {
    document.querySelector('.header__nav--register-btn').innerHTML="Sign In"
  }
  else{
    document.querySelector('.header__nav--register-btn').innerHTML="Sign Up";
  }
  document.querySelector('.main__form--signup').classList.toggle('register__open');
  document.querySelector('.main__form--login').classList.toggle('register__close');
}


document.querySelector('body').addEventListener('keydown',(e)=>{
  if(e.keyCode===9)
  {
    if(e.target.id !=='username' && e.target.id !=='password'  && e.target.id!=='firstName' && e.target.id!=='lastname' && e.target.id!=='email') 
    {
      
      e.preventDefault();
      
    }

    console.log(e);
  }
});

