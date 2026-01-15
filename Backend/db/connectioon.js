import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const url = process.env.MONGO_URI;

mongoose.connect(url).then(()=> {console.log("connect to DB")}).catch((e)=> console.log("error", e)) 
