
/*
author: Paul Kim
date: February 8, 2024
version: 1.0
description: chats route for CapyTalk API server
 */

import express from "express";
import { createChat, getChat, updateChat } from "../controller";

const chats = express.Router();

chats.route('/').post(createChat);
chats.route('/:chatId').get(getChat).post(updateChat);

export default chats;