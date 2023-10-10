import { Router } from "express";
import { createContactAndSendMail } from "../controllers/contact.controller.js";

const router = Router();

router.post("/contact", createContactAndSendMail);

export default router;
