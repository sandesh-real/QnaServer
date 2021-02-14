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


