
/*
author: Paul Kim
date: February 8, 2024
version: 1.0
description: friends route for CapyTalk API server
 */

import express from "express";
const friends = express.Router();

import { addFriend } from "../controller";

friends.route('/').post(addFriend);

export default friends;