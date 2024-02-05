


import mongoose from "mongoose";

export const MessageSchema = new mongoose.Schema({
    content: { type: String, required: true, default:"New Chat"},
    date: { type: Date, required: true, default: Date.now },
    username: { type: String, required: [true, 'username is required']},
    messageId: { type: Number, required: [true, 'chatId is required'] },
})

const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema)
export default Message