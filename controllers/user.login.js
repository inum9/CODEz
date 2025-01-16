import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      throw new ApiError(401, "Error in retrieving the data");
    }
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        throw new ApiError(402, "User is not registered!");
      }
  
  const validPass= await bcrypt.compare(password,user.password);
  
      if (validPass) {
        throw new ApiError(402, "Password is not correct");
      }
  
      // Generate token (optional)
      const token = jwt.sign(
        { id: user._id },
        process.env.jwtSecret,
        { expiresIn: "1h" }
      );
  
      return res
        .status(200)
        .json(
          new ApiResponse(200, "User is logged in successfully!", { token })
        );
    } catch (error) {
      console.log(`Error: ${error.message}`);
     
    }
  });
  

export{loginUser}