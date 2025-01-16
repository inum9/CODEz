import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../model/user.model.js";
import jwt from "jsonwebtoken";


const registerUser= asyncHandler(async(req,res)=>{
           const {username,email,password}=req.body;
           if(!(email||password)){
            throw new ApiError(401,"user details not found !!");
           }

  try {
           const existingUser=  await User.findOne({
              $or:[{email},{username}]
             });
             if(existingUser)
             {
              throw new ApiError(401,"user is already existed!!");
             }
  
          const user= await User.create({username,email,password});
          if(!user)
          {
              throw new ApiError(402,"user is not created!!");
          }

            return res.status(200).json(new ApiResponse(200,user,"user is created and registred!"));
          
  } catch (error) {
    console.log(`error ${error}`);
    
  }
});

export {registerUser};