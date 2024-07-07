import mongoose from "mongoose";
const { Schema } = mongoose;

const chatSchema = new Schema({
    chatName: {
        type: String
    },
    isGroupChat: {
        type: Boolean
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    }],
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: 'MessageModel'
    },
    groupAdmin: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    },
})

const ChatModel = mongoose.model('ChatModel', chatSchema);

export default ChatModel;