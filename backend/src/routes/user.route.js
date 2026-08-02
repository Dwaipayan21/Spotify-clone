import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUser , getMessages, deleteMessage} from "../controller/user.controller.js";

const router = Router();

router.get('/', protectRoute, getAllUser);

router.get("/messages/:userId", protectRoute, getMessages);

router.get("/messages/:messageId", protectRoute, deleteMessage);

export default router  