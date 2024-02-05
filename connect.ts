

import mongoose from "mongoose"

export default function connectDB(url: any) {
    return mongoose.connect(url)
}
