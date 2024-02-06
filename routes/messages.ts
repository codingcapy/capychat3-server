


import express from "express"
const messages = express.Router()

import { createMessage, getMessage, updateMessage } from "../controller"

messages.route('/').post(createMessage)
messages.route('/:userId').get(getMessage).post(updateMessage)

export default messages 