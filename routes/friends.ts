


import express from "express"
const friends = express.Router()

import { addFriend} from "../controller"

friends.route('/').post(addFriend)

export default friends 