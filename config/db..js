import mongoose from "mongoose";   
import { dbName } from "../../dbNName.js ";
import { log } from "node:console";
const connectDb= async ()=>{
       try {
         let connectionInstance= await mongoose.connect(`${process.env.MongoDbUrl}/${dbName}`);
         console.log(`Mongo DB connected atSOME point ${connectionInstance.connection.host}`);
         
       } catch (error) {
                console.log(`errror in mongo db connection :${error}`);
                
       }
}

export {connectDb};