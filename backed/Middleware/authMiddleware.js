const jwt=require("jsonwebtoken");

const authMiddleware=async(req,res,next)=>{
    const {token}=req.headers;

    if(!token){
        return res.json({
            Status:"404",
            Massage:"User not authorized please login again"
        });
    }

    try{
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=token_decode.id;
        next();
    }
    catch{
        return res.json({
            Status:"404",
            Massage:"Some error"
        });
    };
};

module.exports=authMiddleware;