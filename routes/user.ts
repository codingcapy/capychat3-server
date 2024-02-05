
/*
author: Paul Kim
date: December 15, 2023
version: 1.0
description: user route for CocoDogo
 */

import express from "express"
const user = express.Router()

import { validateUser, decryptToken } from "../controller"

user.route('/login').post(validateUser)
user.route('/validation').post(decryptToken)

export default user 