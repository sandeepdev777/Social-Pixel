import bcrypt from 'bcrypt'; // this is used to encrypt our password
import jwt from 'jsonwebtoken'; // it provides a way to create a token that can be used to authenticate with the server
import User from '../models/User.js';

// FUNCTION TO REGISTER A USER
// in this we encrypt the password and save it  and when the user try to log in we check the password and provide them a json web token
export const register = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        picturePath,
        friends,
        location,
        occupation,
      } = req.body;
  
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000),
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

    // FUNCTION TO LOGIN A USER
    export const login=async(req,res)=>{
        try{
            const {email,password}=req.body;
            const user=await User.findOne({email:email}); // this is used to find the user by email
            if(!user){
                return res.status(400).json({msg:"user does not exist"}); // if the user is not found then it sends the status to the frontend
            }

            const isMatch=await bcrypt.compare(password,user.password); // this is used to compare the password entered by the user with the password present in the database   
            if(!isMatch){
                return res.status(400).json({msg:"invalid credentials"}); // if the password is not matched then it sends the status to the frontend
            }

            const token=jwt.sign({id:user._id},process.env.JWT_SECRET); // this is used to create a token for the user
            delete user.password;  // delete the password so that it can't be send to frontend for security reasons
            res.status(200).json({token,user}); // this sends the token and user details to the frontend
        }catch(err){
            res.status(500).json({error:err.message});
        }
    }

