import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true, unique: true ,index:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},{
    timestamps:true
});
const User= mongoose.model("user",userSchema);

userSchema.pre("save",async function (next) {
    try {
        if(!this.isModified("password"))    return next();
        this.password=await bcrypt.hash(this.password,10);
        next();
    } catch (error) {
     console.log(`error :${error}`);
        
    }
});





export {User};