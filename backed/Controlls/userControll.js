const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const validator=require("validator");
const userModel = require("../Models/userModel");

const validatePassword=(pass)=>{
    const minLength = 8;
    const hasNumber = /\d/; 
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/; 
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; 
  
    const isValid = validator.isLength(pass, { min: minLength }) &&
                    hasNumber.test(pass) &&
                    hasUpperCase.test(pass) &&
                    hasLowerCase.test(pass) &&
                    hasSpecialChar.test(pass);
  
    return isValid;
};
  

const loginUser=async(req,res)=>{
    const {email,password}=req.body;

    try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({
                Status:"400",
                Massage:"User does not exits"
            });
        }
    
        const match=await bcrypt.compare(password,user.password);
        if(!match){
           return  res.json({
                Status:"400",
                Massage:"Invaild password"
            });
        }
    
        const token=createToken(user._id);
        res.json({
            Status:"200",
            Massage:"User Login successfully!",
            token
        });
    }
    catch (error){
        res.json({
            Status:"400",
            Massage:"Some error in Login api",
            error
        });
    }
};

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
};

const registerUser=async(req,res)=>{
    const {name,email,password}=req.body;

    try{

        const exits= await userModel.findOne({email});
        if(exits){
            return res.json({
                Status:"400",
                Massage:"This account already exits"
            });
        }

        if(!validator.isEmail(email)){
            return res.json({
                Status:"500",
                Massage:"Please enter the vaild email"
            });
        }

        const vaildPass=validatePassword(password);
        if(!vaildPass){
            return res.json({
                Status:"400",
                Massage:"please enter strong password"
            });
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPass=await bcrypt.hash(password,salt);

        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPass
        });

        const user=await newUser.save();
        const token=createToken(user._id);

        res.json({
            Status:"200",
            Massage:"User register successfully!",
            token
        });
        
    }
    catch (error){
        res.json({
            Status:"400",
            Massage:"Some error in register api",
            error
        });
    }
};

module.exports={loginUser,registerUser};