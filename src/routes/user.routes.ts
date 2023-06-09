import { Router } from "express";
import UserController from "../controllers/user.controllers";

const router = Router()
const user = UserController

router.post("/", user.createUser)
router.get("/", user.getUsers)
router.put("/:id", user.updateUser)
router.get("/:id", user.getById)
//router.post("/:id", user.loginUser)
router.delete("/:id", user.deleteUser)

export default router