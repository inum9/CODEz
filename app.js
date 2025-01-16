import express from "express";
import cors from "cors";
import { root } from "./src/routes/userAuth.js";
const app= express();
app.use(express.json());
app.use(cors());


//
app.use("/api/v1/user",root);

export {app};