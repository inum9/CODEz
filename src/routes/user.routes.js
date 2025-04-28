import { Router } from "express";
import { userLogin, userRegister,userLogOut } from "../controller/user.controllers.js";
import { upload } from "../middleware/multer.js";
import { verifyJwt } from "../middleware/Auth.middleware.js";
const rout= Router();

rout.route("/register").post(
    upload.fields(
   [
    {
        name :"avatar",
        maxCount:1
    },
    {
            name:"coverImage",
            maxCount:1
    }
   ]
),
    userRegister
);
rout.route("/login").get(userLogin);
//secured routes
rout.route("/logout").post(verifyJwt,userLogOut)

export default rout;