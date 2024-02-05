


import mongoose from "mongoose";
import { ChatSchema } from "./Chat";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: [true, 'username is required'], trim: true, maxlength: [80, 'username char limit is 80'] },
    password: { type: String, required: [true, 'password is required'], maxlength: [80, 'password char limit is 80'] },
    date: { type: Date, required: true, default: Date.now },
    active: { type: Boolean, required: true, default: true },
    userId: { type: Number, required: [true, 'userId is required'] },
    friends: [String],
    chats: [ChatSchema],
    blocked: [String]
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)
export default User