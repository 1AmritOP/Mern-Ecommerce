import mongoose from "mongoose";

export const connectToDB = async (uri: string) => {
    try {
        await mongoose.connect(uri,{
            dbName: "Ecom25"
        });
        console.log("Database connected !!");
    } catch (error) {
        console.log(error);
    }
};