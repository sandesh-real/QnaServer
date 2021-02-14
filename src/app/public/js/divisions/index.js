const options=document.querySelectorAll(".option")


options.forEach((item)=>{
    item.addEventListener("click",(e)=>
    {
        console.log(e.target);
        if(e.target.value==="Bsc.Csit")
        {
            
        }
    })
})