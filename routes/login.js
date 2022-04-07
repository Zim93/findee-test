import bcrypt from 'bcryptjs/dist/bcrypt.js';
import express from 'express';
import User from '../models/user.js' 
import jwt from 'jsonwebtoken';

const router = express.Router();

//[POST] , logging
router.post('/',async(req,res)=>{
    const email = req.body.email.toLowerCase();
    const user = await User.findOne({email:email});

    //check if user exist in data base
    if(!user){
        return res.status(400).json({message : 'User doesn\'t exists, please singin'});
    }

    try{
        //checking hashed password
       if( await bcrypt.compare(req.body.password, user.password)){
           
            //create jsonwebtoken
            //serialize user object with secret key
            //token expire in 20min
            const accessToken= jwt.sign({user}, process.env.SECRET_KEY, {expiresIn: '20m'});
            res.status(202).json({message : "Successfuly logged", accessToken:accessToken });
       }else{
            res.status(203).json({message : "Wrong credentials"});
       }
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

export default router;