import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try{
        let token=req.header("Authorization"); 

        if(!token) return res.status(403).json("Access denied");  // this checks if the token is present or not

        if(token.startsWith("Bearer ")){  // this checks if the token starts with "Bearer " or not
            token=token.slice(7,token.length).trimLeft();  // it removes the Bearer present in front of the token
        }

        const verified=jwt.verify(token,process.env.JWT_SECRET);  // this is used to verify the token
        req.user=verified;
        next();
}catch(err){
 res.status(500).json({error:err.message});
}
};

