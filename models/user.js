import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,

    },
    password:{
        type : String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now,
    },
    token:{
        type: String,
    }
});

export default mongoose.model('user',userSchema);