import express from 'express';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/',authenticateToken ,async(req,res)=>{
   try{
    const users = await User.find();
    res.json(users);
   } catch(err){
    res.status(500).json({message:err.message});
   }
})

function authenticateToken(req,res,next){
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];
   if (token == null) return res.status(401).json({message: 'No access'});

   jwt.verify(token, process.env.SECRET_KEY, (err, user) =>{
       if (err) return res.status(403).json({message: 'Invalid token'});
       req.user= user;
       next()
   })
}
export default router;