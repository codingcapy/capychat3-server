


import express from "express"
const chats = express.Router()

import { createChat, getChat, updateChat } from "../controller"

chats.route('/').post(createChat)
chats.route('/:chatId').get(getChat).post(updateChat)

export default chats 