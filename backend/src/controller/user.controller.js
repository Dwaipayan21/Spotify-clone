import {User} from "../models/user.model.js";

export const getAllUser = async (req, res, next) => {
    try {
        const currentUserId = req.auth.userId;
        const users = await User.find({clerkId: {$ne: currentUserId}}); //remove my self from all the user

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};