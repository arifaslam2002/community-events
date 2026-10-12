import mongoose from "mongoose";
const connectDb = async()=>{
try {
     await mongoose.connect(process.env.MOGODB_URL);
 console.log("MongoDb connected");
} catch (error) {
    console.log(error);
}
} 
export default connectDb;
