import mongoose from "mongoose";
const { Schema } = mongoose;

const chatSchema = new Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    }],
    lastestMessage: {
        type: Schema.Types.ObjectId,
        ref: 'MessageModel'
    },
}, { timestamps: true })

const ChatModel = mongoose.model('ChatModel', chatSchema);

export default ChatModel;