
/*
author: Paul Kim
date: February 8, 2024
version: 1.0
description: messages route for CapyTalk API server
 */

import express from "express";
import { createMessage, getMessage, updateMessage } from "../controller";

const messages = express.Router();

messages.route('/').post(createMessage);
messages.route('/:userId').get(getMessage).post(updateMessage);

export default messages;