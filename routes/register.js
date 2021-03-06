import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs/dist/bcrypt.js';
import validator from 'email-validator';

const router = express.Router();

//[POST], creating new user
router.post('/',async(req,res)=>{
    //Encrypt user password
    if(!req.body.email) return res.status(400).json({message: 'Missing email'});
    if(!req.body.password) return res.status(400).json({message: 'Missing password'});
    if(!validator.validate(req.body.email)) return res.status(400).json({message: 'Invalid email'});

    const cryptedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        email: req.body.email.toLowerCase(),
        password: cryptedPassword
    })

    try{
        const email = user.email;
        const oldUser = await User.findOne({ email });
        
        // Validate if user exist in our database
        if(oldUser){
            return res.status(409).json({message: "Email already exists. Please login"});
        }

        //Saving newUser in DB
        const newUser = await user.save();
        res.status(201).json(newUser);
    }catch(err){
        res.status(400).json({message: err.message})
    }

    
    
})

export default router;