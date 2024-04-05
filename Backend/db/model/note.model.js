import mongoose from "mongoose";
const schema = mongoose.Schema({
    message:String, 
}, {timestamps: true});
export const messageModel = mongoose.model('message',schema);