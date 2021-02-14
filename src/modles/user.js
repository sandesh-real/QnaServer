const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const Question = require("./question");
var fs = require("fs");


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
      
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true
    },
  
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
            throw new Error("Email is invalid");
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validate(value)
        {
            if(value.toLowerCase().includes('password'))
            {
                throw new Error("Password cannot container password");
            }
        }
    },
 
    faculty:{
        type:String,
        trim:true,
        required:true
        },
    sem:{
        type:String,
        trim:true
    },
    year:{
        type:String,
        trim:true,
       
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer,
       
        
    }
},{
    timestamps:true
});

userSchema.virtual('question',{
    ref:'Question',
    localField:"_id",
    foreignField:"user_id",
})



userSchema.methods.generateAuthToken=async function()
{
const user=this;
const token=jwt.sign({_id:user._id.toString()},'thisismynewtoken');
user.tokens=user.tokens.concat(({token}));

await user.save();
return token;
};

userSchema.statics.findByCredentials=async (email,password)=>{
    const user=await User.findOne({email});
    
    if(!user)
    {
        throw new Error("unable to login");
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch)
    {
        throw new Error('unable to login');
    }
    return user;

}   ;

userSchema.pre('save',async function(next){
    const user=this;
    
    if(user.isModified('password'))
    {
        user.password=await bcrypt.hash(user.password,8);
    }
    
});

userSchema.pre('save',function(next){
    const user=this;
    
   
    fs.readFile('C:/Users/sharm/Desktop/Qnawithnode/src/app/public/images/html/noprofile.png', function(err, data) {
        if (err) throw err;
      
        // Encode to base64
      
        if(!user.avatar){
        var encodedImage = Buffer.from(data, 'binary');
  
          user.avatar=encodedImage;
          
        }
          next();
         
        
      });
});




const User=mongoose.model("User",userSchema);

module.exports=User;