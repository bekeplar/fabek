import { Router } from "express";

import { createUser, userLogin } from "../controllers/user";

const router = Router();

router.post("/signup", createUser);

router.post("/login", userLogin);

export default router;
