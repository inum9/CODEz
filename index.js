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