import mongoose from "mongoose";
const URI = "mongodb://localhost:27017/students";

const connectDB = async () => {
    try {
        await mongoose.connect(URI)
        const dbConnect = mongoose.connection;
        dbConnect.once('open', () => {
            console.log(`The database is connected ${URI}`);
        })
    } catch (err) {
        console.log(`The database Error :\n${err}`);
    };
};

export default connectDB;