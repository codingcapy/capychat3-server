
/*
author: Paul Kim
date: February 8, 2024
version: 1.0
description: database connector for CapyTalk API server
 */

import mongoose from "mongoose";

export default function connectDB(url: any) {
    return mongoose.connect(url);
}
