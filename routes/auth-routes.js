import { Router } from "express";
import { authorize } from "../middleware/authorize.js";
import {
  post_signup,
  post_login,
  get_userlist,
  post_logout,
} from "../controllers/auth-controllers.js";

const router = Router();

router.post("/signup", post_signup);

router.post("/login", post_login);

router.get("/getlist", authorize, get_userlist);

router.get("/logout", post_logout);

export default router;
