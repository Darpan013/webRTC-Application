import mongoose from "mongoose"

const messageSchema = mongoose.Schema({
    conversationId:{
        type : String,
    },
    senderId:{
        type : String,
    },
    message:{
        type : String
    } 
},{Timestamps:true} )

export const Messages = mongoose.model("message", messageSchema)

