import {User} from "../models/user.model.js";

export const getAllUser = async (req, res, next) => {
    try {
        const {userId} = req.auth();
        const users = await User.find({clerkId : { $ne: userId }}); //remove my self from all the user

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};