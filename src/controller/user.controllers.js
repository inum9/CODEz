import { asynHandler } from "../utils/asynHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const option={
  httpOnly:true,
  secure: true
}
//u
const generateACCandREFname = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

        user.refreshToken=refreshToken;
      await user.save({validateBeforeSave:false});

      return {accessToken,refreshToken};

  } catch (error) {
    throw new ApiError(500, "SOMETHING WENT WRONG WHILE GENERATING TOKENS !! ");
  }
};

const userRegister = asynHandler(async (req, res) => {
  const { userName, fullName, password, email } = req.body;

  if (
    [fullName, email, userName, password].some((field) => field?.trim() == "")
  ) {
    throw new ApiError(400, "field is empty!!");
  }

  const validatingUser = await User.findOne({
    $or: [{ email }, { userName }, { fullName }],
  });

  if (validatingUser) {
    throw new ApiError(400, "USER IS ALREADY EXISTED!!");
  }

  if (!req.files || !req.files.avatar || req.files.avatar.length === 0) {
    throw new ApiError(400, "Avatar file is required!");
  }
  const path_avatar = req.files.avatar[0].path;
  const avatar = await uploadOnCloudinary(path_avatar);
  if (!avatar) {
    throw new ApiError(401, "AVATAR IS NOT AVAILABLE PLEASE TRY AGAIN LATER!!");
  }

  const registeredUserTemplate = await User.create({
    fullName,
    avatar: avatar.url,
    username: userName,
    email,

    password,
  });
  const createdUser = await User.findById(registeredUserTemplate._id).select(
    "-refreshToken -password"
  );
  if (!createdUser) {
    throw new ApiError(502, "USER IS  NOT CREATED");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "USER IS CREATED SUCCESSFULLY"));
});
const userLogin = asynHandler(async (req, res) => {
  const { email, userName, password } = req.body;

  if (!(email || userName)) {
    throw new ApiError(400, "FIELDS ARE EMPTY ,PLEASE FILL THE DETAILS");
  }

  const findingUser = await User.findOne({
    $or: [{ email }, { userName }],
  });
  if (!findingUser) {
    throw new ApiError(401, "USER DEOS NOT EXIST");
  }

  const isValidPass = await findingUser.isPasswordCorrect(password);
  if (!isValidPass) {
    throw new ApiError(402, "PASSWORD IS NOT CORRECTED !!");
  }
const  {accessToken,refreshToken}= await generateACCandREFname(findingUser._id);

  const loggedInUser=   await User.findById(findingUser._id).select("-refreshToken -password");

  return res.status(200)
  .cookie("accessToken",accessToken,option)
  .cookie("refreshToken",refreshToken,option)
  .json(
    new ApiResponse(
      200,
      {
        user:loggedInUser,accessToken,refreshToken,
      },
      "USER IS LOGGEDIN SUCCESSFULLY!!"
    )
  )

});
const userLogOut= asynHandler(async (req ,res)=>{
        await User.findByIdAndUpdate(
          req.user._id,
          {
            $set:{
              refreshToken:undefined
            },
           
          },{
            new:true
          }
        )
        return res.status(200).clearCookie("accessToken",option).clearCookie("refreshToken",option).json(new ApiResponse(200,{},"USER LOGGEDOUT SUCCESSFULLLY"))
});
export { userRegister, userLogin ,userLogOut};
