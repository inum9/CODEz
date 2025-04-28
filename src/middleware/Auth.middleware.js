import { ApiError } from "../utils/ApiError.js";
import { asynHandler } from "../utils/asynHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJwt = asynHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("authorization")?.replace("Bearer ", " ");
    if (!token) {
      throw new ApiError(401, "UNAUTHORIZE TOKEN");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-refreshToken -password"
    );

    if (!user) {
      throw new ApiError(401, "INVALID ACCESS TOKEN");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "ERROR IN MIDDLEWARE!");
  }
});
