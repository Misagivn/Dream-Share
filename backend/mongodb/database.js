import mongoose, { MongooseError } from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if(isConnected) {
        console.log("MongoDB is connected")
        return
    }
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "dreamshare",
            userNewUrlParser: true,
            useUnifiedTopology: true,
        }) 
        isConnected = true

        console.log("MongoDB is connected")

    } catch(err) {
        console.log(err)
    }
}