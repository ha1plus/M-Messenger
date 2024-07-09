import UserModel from "../models/UserModel.js";
import ChatModel from "../models/ChatModel.js";
import MessageModel from "../models/MessageModel.js";

class MessageController {
    async allMessages(req, res) {
        try {
            const messages = await MessageModel.find({ chat: req.params.chatId })
                .populate("sender", "name email")
                .populate("receiver")
                .populate("chat");
            res.status(200).json(messages);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async sendMessage(req, res) {
        const { content, chatId } = req.body;

        // Check if content and chatId are provided
        if (!content || !chatId) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        try {
            // Find the chat based on chatId
            const chat = await ChatModel.findById(chatId);
            if (!chat) {
                return res.status(400).json({ message: "Chat not found" });
            }

            // Find the receiver user in the chat
            let receiver;
            chat.users.forEach((user) => {
                if (user._id.toString() !== req.user._id.toString()) {
                    receiver = user._id;
                }
            });

            // Check if receiver is found
            if (!receiver) {
                return res.status(400).json({ message: "Receiver not found" });
            }

            // Create a new message object
            const newMessage = {
                sender: req.user._id,
                receiver: receiver._id,
                content: content,
                chat: chatId,
            };

            // Create the message in the database
            const message = await MessageModel.create(newMessage);

            // Populate sender and receiver names in the message
            const fullMessage = await MessageModel.findOne({ _id: message._id })
                .populate("sender", "name")
                .populate("receiver", "name");

            // Update the chat with the latest message
            await ChatModel.findByIdAndUpdate(chatId, { lastestMessage: message._id });

            // Return the full message object with sender and receiver names
            res.status(200).json(fullMessage);
        } catch (error) {
            // Handle any errors during message creation or database operations
            res.status(400).json({ message: error.message });
        }
    }
}

export default MessageController;
