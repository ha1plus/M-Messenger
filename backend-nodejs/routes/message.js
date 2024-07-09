import express from "express";
import MessageController from "../controllers/MessageController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; 

const routerMessagges = express.Router();

const messageController = new MessageController();

routerMessagges.post("/", authMiddleware, messageController.sendMessage);

export default routerMessagges;
