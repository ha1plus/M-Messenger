import UserModel from "../models/UserModel.js";
import generateToken from "../config/generateToken.js";

class UserController {
    async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const user = await UserModel.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    }

    async index(req, res) {
        const currentUser = req.user;
        const users = await UserModel.find({ _id: { $ne: currentUser._id } });
        if (users) {
            return res.status(200).json(users);
        } else {
            return res.status(400).json({ message: 'Invalid user data' });
        }
    }

    async store(req, res) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const userExist = await UserModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await UserModel.create(req.body);
        if (user) {
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            return res.status(400).json({ message: 'Invalid user data' });
        }
    }

    async getUserProfile(req, res) {
        try {
            const user = await UserModel.findById(req.user.id).select('-password');
            if (user) {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
}

export default UserController;
