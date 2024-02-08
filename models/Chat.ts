
/*
author: Paul Kim
date: February 8, 2024
version: 1.0
description: chat model schema for CapyTalk API server
 */

import mongoose from "mongoose";
import { MessageSchema } from "./Message";

export const ChatSchema = new mongoose.Schema({
    title: { type: String, required: true, default: "New Chat" },
    date: { type: Date, required: true, default: Date.now },
    users: [String],
    messages: [MessageSchema],
    chatId: { type: Number, required: [true, 'chatId is required'] },
});

const Chat = mongoose.models.Chat || mongoose.model('Chat', ChatSchema);
export default Chat;