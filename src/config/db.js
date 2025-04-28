import mongoose, { connect } from "mongoose";
import dbName from "../const.js"

const connectDb= async ()=>{
    try {
            const connectionInstance= await mongoose.connect(`${process.env.MONGO_DB_URI}/${dbName}`);
            console.log(`mongo is connected !!  ${connectionInstance.connection.host}`);

            
    } catch (error) {
        process.exit(1)||console.log(error);
        
    }
}

export  default connectDb;