const jwt=require('jsonwebtoken');
const User=require('../modles/user');

const auth=async (req,res,next)=>{

    try{
        
            var token=req.query.Authorization.replace('Bearer ','');

      
        const decoded=jwt.verify(token,'thisismynewtoken');
        const user=await User.findOne({_id:decoded._id,'tokens.token':token});
        if(!user)
        {
            throw new Error();
        }
        req.token=token;
        req.user=user;
        
        // req.subject=subject;

        next();
    }
    catch(e){
        res.status(400).send({error:"please authenticate"});
    }
}
module.exports=auth;