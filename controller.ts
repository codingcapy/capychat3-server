
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./models/User";
import Chat from "./models/Chat";
import Message from "./models/Message";

const saltRounds = 6;

export interface IDecodedUser {
    userId: number
};

export async function validateUser(req: Request, res: Response) {
    const { username, password } = req.body
    const user = await User.findOne({ username: username })
    if (!user) return res.json({ result: { user: null, token: null } });
    bcrypt.compare(password, user?.password || "", function (err, result) {
        if (result === true) {
            const token = jwt.sign({ id: user?.id }, "secret", { expiresIn: "2days" });
            res.json({ result: { user, token } });
        }
        else {
            return res.json({ result: { user: null, token: null } });
        }
    })
}

export async function decryptToken(req: Request, res: Response) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(403).send("Header does not exist");
            return "";
        }
        const token = authHeader.split(" ")[1];
        const decodedUser = jwt.verify(token, "secret");
        const user = searchUserById((decodedUser as IDecodedUser).userId);
        res.json({ result: { user, token } });
    }
    catch (err) {
        res.status(401).json({ err });
    }
}

export async function searchUserById(id: number) {
    const user = User.findOne({ userId: id });
    // if (!user) throw new Error("User not found");
    return user;
}

export async function createUser(req: Request, res: Response) {
    const users = await User.find({})
    const userId = users.length === 0 ? 1 : users[users.length - 1].userId + 1
    const username = req.body.username;
    const password = req.body.password;
    if (users.find((user: any) => user.username === username.toString())) {
        res.json({ success: false, message: "Username already exists" })
    }
    else {
        const encrypted = await bcrypt.hash(password, saltRounds)
        const user = await User.create({ username: username, password: encrypted, userId: userId })
        res.status(200).json({ success: true, message: "Sign up successful!" })
    }
}

export async function addFriend(req: Request, res: Response) {
    const inputUser = req.body.username
    const user = await User.findOne({ username: inputUser })
    const inputFriend = req.body.friend
    const friend = await User.findOne({ username: inputFriend })
    if (!friend) {
        return res.json({ success: false, message: "User does not exist" })
    }
    if (user.friends.includes(friend.username)) {
        return res.json({ success: false, message: "User is already your friend!" })
    }
    if (inputUser == inputFriend) {
        return res.json({ success: false, message: "That's yourself!" })
    }
    await User.updateOne({ username: inputUser }, { $push: { friends: friend.username } })
    await User.updateOne({ username: inputFriend }, { $push: { friends: user.username } })
    res.status(200).json({ success: true, message: "Friend added successfully!" })
}

export async function getUser(req: Request, res: Response) {
    const userId = req.params.userId;
    const user = await User.findOne({ userId: parseInt(userId) })
    res.json(user)
}

export function updateUser() {


}

export async function createChat(req: Request, res: Response) {
    const chats = await Chat.find({})
    const chatId = chats.length === 0 ? 1 : chats[chats.length - 1].chatId + 1
    const title = req.body.title
    const user = req.body.user
    const friend = req.body.friend
    await Chat.create({ title, chatId })
    await Chat.updateOne({ chatId: chatId }, { $push: { users: user } })
    await Chat.updateOne({ chatId: chatId }, { $push: { users: friend } })
    const chat = await Chat.findOne({ chatId: chatId })
    await User.updateOne({ username: user }, { $push: { chats: chat } })
    await User.updateOne({ username: friend }, { $push: { chats: chat } })
    res.status(200).json({ success: true, message: "Chat added successfully!" })
}

export function getChat() {


}

export function updateChat() {


}

export async function createMessage(req: Request, res: Response) {
    const inputContent = req.body.content
    const user = req.body.user
    const chatId = req.body.chatId
    const messages = await Message.find({})
    const messageId = messages.length === 0 ? 1 : messages[messages.length - 1].messageId + 1
    await Message.create({ content: inputContent, username: user, messageId })
    const message = await Message.findOne({ messageId: messageId })
    const chat = await Chat.findOne({ chatId: parseInt(chatId) })
    try { 
        await Chat.updateOne({ chatId: parseInt(chatId) }, { $push: { messages: message } }) 
        res.status(200).json({ success: true, message: "Message added successfully!" })
    }
    catch (err) {
        console.log(err)
    }
}

export function getMessage() {


}

export function updateMessage() {


}