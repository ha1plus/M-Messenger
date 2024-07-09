import UserModel from "../models/UserModel.js";
import ChatModel from "../models/ChatModel.js";

class ConversationController {
    async fetchAndAccessChats(req, res) {
        try {
            // Tìm kiếm cuộc trò chuyện giữa hai người dùng
            var isChat = await ChatModel.find({
                $and: [
                    { users: { $elemMatch: { $eq: req.params.id } } },
                    { users: { $elemMatch: { $eq: req.user._id } } },
                ],
            })
                .populate("users", "-password")
                .populate("lastestMessage", "content sender receiver createdAt");

            // Nếu không tìm thấy cuộc trò chuyện, tạo cuộc trò chuyện mới
            if (isChat.length === 0) {
                var chatData = {
                    users: [req.params.id, req.user._id],
                };

                const chat = await ChatModel.create(chatData);
                isChat = await ChatModel.find({ _id: chat._id })
                    .populate("users", "-password")
            }

            // Sắp xếp kết quả theo thời gian cập nhật mới nhất
            isChat.sort((a, b) => b.updatedAt - a.updatedAt);

            // Trả về danh sách cuộc trò chuyện đã tìm thấy
            return res.status(200).json(isChat[0]);
        } catch (error) {
            // Xử lý lỗi và trả về mã lỗi
            console.error(error);
            return res.status(400).json({ message: "Error fetching and accessing chats" });
        }
    }
}

export default ConversationController;
