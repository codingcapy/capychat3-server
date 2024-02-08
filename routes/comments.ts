
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: plans router for capy finance web server
 */

import express from "express"
import { createComment } from "../controller"

const comments = express.Router()

comments.route("/").post(createComment)

export default comments