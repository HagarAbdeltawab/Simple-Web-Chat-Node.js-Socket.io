import mongoose from "mongoose";
export const dbConnection = ()=>{
    mongoose.connect("mongodb://0.0.0.0:27017/socket")
        .then( _ => console.log("DB connected"))
        .catch( err => console.log(`DB Error ${err}`))
}