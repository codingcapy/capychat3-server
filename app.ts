
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import users from "./routes/users"
import connectDB from "./connect"
import user from "./routes/user"
import friends from "./routes/friends"
import chats from "./routes/chats"

dotenv.config()
const app = express()
const port = 3333

app.use(express.json())
app.use(cors())
app.get("/", (req, res) => res.send("welcome"))
app.use("/api/users", users)
app.use("/api/user", user)
app.use("/api/user/friends", friends)
app.use("/api/chats", chats)

async function start() {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log("Connected to database.")
        app.listen(port, () => console.log(`Server listening on port: ${port}`))
    }
    catch (err) {
        console.log(err)
    }
}

start()