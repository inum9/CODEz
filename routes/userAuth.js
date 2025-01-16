import { Router } from "express";
import { registerUser } from "../controllers/userRegister.js";
import { loginUser } from "../controllers/user.login.js";
import { createProblem, getProblem, getSingleProblem, updateProblem } from "../controllers/problem.controller.js";




const root = Router();
root.route("/register").post(registerUser);
root.route("/login").post(loginUser);




//problem routes
root.route("/creatProblem").post(createProblem);
root.route("/getProb").get(getProblem);
root.route("/getSingleProblem/:id").get(getSingleProblem)
root.route("/updateProblem").put(updateProblem);
root.route("/deleteProblem");



export { root };