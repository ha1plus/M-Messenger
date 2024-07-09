import express from "express";
import ConversationController from "../controllers/ConversationController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; 

const routeConversations = express.Router();

const conversationController = new ConversationController();

routeConversations.get("/:id", authMiddleware, conversationController.fetchAndAccessChats);

export default routeConversations;
