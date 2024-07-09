import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    content: {
        type: String,
        required: true
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'ChatModel'
    },
}, { timestamps: true })

const MessageModel = mongoose.model('MessageModel', messageSchema);

export default MessageModel;