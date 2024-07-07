import express from "express";
import UserController from "../controllers/UserController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; 

const routeUsers = express.Router();

const userController = new UserController();

// Định nghĩa các route và áp dụng middleware xác thực
routeUsers.get("/user", authMiddleware, userController.getUserProfile);
routeUsers.get("/users", authMiddleware, userController.index);
routeUsers.post("/register", userController.store);
routeUsers.post("/login", userController.login);

export default routeUsers;
