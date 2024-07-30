import mongoose from "mongoose";

const dbConnection =async ()=>{
  mongoose.connect(process.env.MONGO_URI,{
  dbName:"JobKaro"
  }).then(()=>{
    console.log("Connected to Mongo Successfully!");
  }).catch((error)=>{
    console.log(`Some error occured while connecting to database :${error}`)
  });

};

export default dbConnection;