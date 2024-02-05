


import express from "express"
const users = express.Router()

import { createUser, getUser, updateUser } from "../controller"

users.route('/').post(createUser)
users.route('/:userId').get(getUser).post(updateUser)

export default users 