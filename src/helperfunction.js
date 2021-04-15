const ShowCreatedDate=(createdAt)=>{
    var questionCreated=((new Date()-createdAt)/60000);
           
    var tempValue='';
    
    if(questionCreated<1)
    {
       
        questionCreated=`just now`;
        console.log(questionCreated)
    }
    else if(questionCreated<60)
    {
        questionCreated=`${questionCreated}`
        for(let i=0;i<questionCreated.length;i++)
        {
            
           
            if(questionCreated[i]!=='.')
            {
                tempValue=tempValue+questionCreated[i];
            }
            else{
                break;
            }
           
        }   
        questionCreated=tempValue+' min ago';
    }
    else if(questionCreated>60 && questionCreated<1440)
    {
        
        questionCreated=`${questionCreated/60}`
      
        for(let i=0;i<questionCreated.length;i++)
        {
            
           
            if(questionCreated[i]!=='.')
            {
                tempValue=tempValue+questionCreated[i];
            }
            else{
                break;
            }
           
        }
        
        questionCreated=tempValue+' hr ago';
        console.log(questionCreated)
    }
    else if(questionCreated>1440 && questionCreated<43200)
    {  
      
         questionCreated=  (questionCreated/1400).toString()
        
        for(let i=0;i<questionCreated.length;i++)
        {
           
            if(questionCreated[i]!=='.')
            {
                tempValue=tempValue+questionCreated[i];
            }
            else{
                break;
            }
        }
        questionCreated=tempValue+' day ago';
       
    }
    else if(questionCreated>43200 && questionCreated<525600)
    {
        
        questionCreated=`${questionCreated/43200}`;
        
        for(let i=0;i<questionCreated.length;i++)
        {
          
            if(questionCreated[i]!=='.')
            {
                tempValue=tempValue+questionCreated[i];
            }
            else{
                break;
            }
        }
        questionCreated=tempValue+' month ago';
    }
    else{
        
        questionCreated=questionCreated/525600;
        questionCreated=questionCreated.toString();
        
        for(let i=0;i<questionCreated.length;i++)
        {
            
            if(questionCreated[i]!=='.')
            {
                tempValue=tempValue+questionCreated[i];
            }
            else{
                break;
            }
        }
        questionCreated=tempValue+' year ago'; 
    }
    return questionCreated
}

 module.exports=ShowCreatedDate;