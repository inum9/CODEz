import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDb } from "./src/config/db..js";
dotenv.config("./.env");


connectDb().then(
    app.listen(process.env.PORT,()=>{
        console.log(`server is connected ${process.env.PORT}`);
        
    })
)