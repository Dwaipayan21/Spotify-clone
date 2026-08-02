import { Message } from "../models/message.model.js";
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

export const getMessages = async (req, res, next) => {
    try {
        const myId = req.auth().userId;
        const {userId} = req.params;

        const messages = await Message.find({
            $or: [
                {senderId: userId, receiverId: myId},
                {senderId: myId, receiverId: userId},
            ]
        }).sort({ createdAt : 1});

        res.status(200).json(messages);
    } catch (error) {
        next(error);
    }
};

export const deleteMessage = async (req, res, next) => {
    try {
        const myId = req.auth().userId;
        const { messageId } = req.params;

        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        // only the sender can delete their own message
        if (message.senderId !== myId) {
            return res.status(403).json({ message: "You can only delete your own messages" });
        }

        await Message.findByIdAndDelete(messageId);

        res.status(200).json({ messageId });
    } catch (error) {
        next(error);
    }
};