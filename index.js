<<<<<<< HEAD
import connectDb from "./src/config/db.js";
import app from "./src/app.js";
import dotenv from 'dotenv'
const port = process.env.PORT

dotenv.config({
    path:"/.env"
})

connectDb()
.then(()=>{
    app.listen(port,()=>{
                    console.log(`server is listening on port ${port}`);
                    
    });
})
.catch((err)=>{
    console.log("mongo db ocnnection is failed !!",err);
    
})
=======
import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDb } from "./src/config/db..js";
dotenv.config("./.env");


connectDb().then(
    app.listen(process.env.PORT,()=>{
        console.log(`server is connected ${process.env.PORT}`);
        
    })
)
>>>>>>> 591723081154e3b3bed995a10a001f184ef54ddc
